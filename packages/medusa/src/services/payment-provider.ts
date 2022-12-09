import { MedusaError } from "medusa-core-utils"
import { BasePaymentService } from "medusa-interfaces"
import {
  AbstractPaymentService,
  PaymentContext,
  PaymentSessionResponse,
  TransactionBaseService,
} from "../interfaces"
import { EntityManager } from "typeorm"
import { PaymentSessionRepository } from "../repositories/payment-session"
import { PaymentRepository } from "../repositories/payment"
import { RefundRepository } from "../repositories/refund"
import { PaymentProviderRepository } from "../repositories/payment-provider"
import { buildQuery, isString } from "../utils"
import { FindConfig, Selector } from "../types/common"
import {
  Cart,
  Payment,
  PaymentProvider,
  PaymentSession,
  PaymentSessionStatus,
  Refund,
} from "../models"
import { PaymentProviderDataInput } from "../types/payment-collection"
import { FlagRouter } from "../utils/flag-router"
import OrderEditingFeatureFlag from "../loaders/feature-flags/order-editing"
import PaymentService from "./payment"
import { Logger } from "../types/global"
import { PaymentSessionInput } from "../types/payment"
import { CustomerService } from "./index"

type PaymentProviderKey = `pp_${string}` | "systemPaymentProviderService"
type InjectedDependencies = {
  manager: EntityManager
  paymentSessionRepository: typeof PaymentSessionRepository
  paymentProviderRepository: typeof PaymentProviderRepository
  paymentRepository: typeof PaymentRepository
  refundRepository: typeof RefundRepository
  paymentService: PaymentService
  customerService: CustomerService
  featureFlagRouter: FlagRouter
  logger: Logger
} & {
  [key in `${PaymentProviderKey}`]:
    | AbstractPaymentService
    | typeof BasePaymentService
}

/**
 * Helps retrieve payment providers
 */
export default class PaymentProviderService extends TransactionBaseService {
  protected manager_: EntityManager
  protected transactionManager_: EntityManager | undefined
  protected readonly container_: InjectedDependencies
  protected readonly paymentSessionRepository_: typeof PaymentSessionRepository
  // eslint-disable-next-line max-len
  protected readonly paymentProviderRepository_: typeof PaymentProviderRepository
  protected readonly paymentRepository_: typeof PaymentRepository
  protected readonly refundRepository_: typeof RefundRepository
  protected readonly customerService_: CustomerService
  protected readonly logger_: Logger

  protected readonly featureFlagRouter_: FlagRouter

  constructor(container: InjectedDependencies) {
    super(container)

    this.container_ = container
    this.manager_ = container.manager
    this.paymentSessionRepository_ = container.paymentSessionRepository
    this.paymentProviderRepository_ = container.paymentProviderRepository
    this.paymentRepository_ = container.paymentRepository
    this.refundRepository_ = container.refundRepository
    this.customerService_ = container.customerService
    this.featureFlagRouter_ = container.featureFlagRouter
    this.logger_ = container.logger
  }

  async registerInstalledProviders(providerIds: string[]): Promise<void> {
    return await this.atomicPhase_(async (transactionManager) => {
      const model = transactionManager.getCustomRepository(
        this.paymentProviderRepository_
      )
      await model.update({}, { is_installed: false })

      await Promise.all(
        providerIds.map(async (providerId) => {
          const provider = model.create({
            id: providerId,
            is_installed: true,
          })
          return await model.save(provider)
        })
      )
    })
  }

  async list(): Promise<PaymentProvider[]> {
    const ppRepo = this.manager_.getCustomRepository(
      this.paymentProviderRepository_
    )
    return await ppRepo.find()
  }

  async retrievePayment(
    id: string,
    relations: string[] = []
  ): Promise<Payment | never> {
    const paymentRepo = this.manager_.getCustomRepository(
      this.paymentRepository_
    )
    const query = {
      where: { id },
      relations: [] as string[],
    }

    if (relations.length) {
      query.relations = relations
    }

    const payment = await paymentRepo.findOne(query)

    if (!payment) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Payment with ${id} was not found`
      )
    }

    return payment
  }

  async listPayments(
    selector: Selector<Payment>,
    config: FindConfig<Payment> = {
      skip: 0,
      take: 50,
      order: { created_at: "DESC" },
    }
  ): Promise<Payment[]> {
    const payRepo = this.manager_.getCustomRepository(this.paymentRepository_)
    const query = buildQuery(selector, config)
    return await payRepo.find(query)
  }

  async retrieveSession(
    id: string,
    relations: string[] = []
  ): Promise<PaymentSession | never> {
    const sessionRepo = this.manager_.getCustomRepository(
      this.paymentSessionRepository_
    )

    const query = {
      where: { id },
      relations: [] as string[],
    }

    if (relations.length) {
      query.relations = relations
    }

    const session = await sessionRepo.findOne(query)

    if (!session) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Payment Session with ${id} was not found`
      )
    }

    return session
  }

  /**
   * Creates a payment session with the given provider.
   * @param providerIdOrSessionInput - the id of the provider to create payment with
   * @param cart - a cart object used to calculate the amount, etc. from
   * @return the payment session
   */
  async createSession<
    TInput extends string | PaymentSessionInput = string | PaymentSessionInput
  >(
    providerIdOrSessionInput: TInput,
    ...[cart]: TInput extends string ? [Cart] : [never?]
  ): Promise<PaymentSession> {
    return await this.atomicPhase_(async (transactionManager) => {
      const providerId = isString(providerIdOrSessionInput)
        ? providerIdOrSessionInput
        : providerIdOrSessionInput.provider_id
      const data = (
        isString(providerIdOrSessionInput) ? cart : providerIdOrSessionInput
      ) as Cart | PaymentSessionInput

      const provider = this.retrieveProvider<AbstractPaymentService>(providerId)
      const context = this.buildCreatePaymentContext(data)

      const paymentResponse = await provider
        .withTransaction(transactionManager)
        .createPayment(context)

      const sessionData = paymentResponse.session_data ?? paymentResponse

      await this.processCollectedData(
        {
          customer: { id: context.customer?.id },
        },
        paymentResponse
      )

      return await this.saveSession(providerId, {
        cartId: context.id,
        sessionData,
        status: PaymentSessionStatus.PENDING,
      })
    })
  }

  async createSessionNew(
    sessionInput: Omit<PaymentSessionInput, "cart"> & {
      cart?: PaymentSessionInput["cart"]
    }
  ): Promise<PaymentSession> {
    return await this.atomicPhase_(async (transactionManager) => {
      const provider = this.retrieveProvider<AbstractPaymentService>(
        sessionInput.provider_id
      )

      const context = {
        ...sessionInput,
        collected_data: sessionInput.customer?.metadata ?? {},
      } as PaymentContext

      const paymentResponse = await provider
        .withTransaction(transactionManager)
        .createPaymentNew(context)

      const sessionData = paymentResponse.session_data ?? paymentResponse

      await this.processCollectedData(
        {
          customer: { id: sessionInput.customer?.id },
        },
        paymentResponse
      )

      return await this.saveSession(sessionInput.provider_id, {
        sessionData,
        amount: sessionInput.amount,
        status: PaymentSessionStatus.PENDING,
      })
    })
  }

  /**
   * Refreshes a payment session with the given provider.
   * This means, that we delete the current one and create a new.
   * @param paymentSession - the payment session object to
   *    update
   * @param cart - a cart object used to calculate the amount, etc. from
   * @return the payment session
   */
  async refreshSession(
    paymentSession: PaymentSession,
    cart: Cart
  ): Promise<PaymentSession> {
    return this.atomicPhase_(async (transactionManager) => {
      const session = await this.retrieveSession(paymentSession.id)
      const provider = this.retrieveProvider<AbstractPaymentService>(
        paymentSession.provider_id
      )
      await provider.withTransaction(transactionManager).deletePayment(session)

      const sessionRepo = transactionManager.getCustomRepository(
        this.paymentSessionRepository_
      )

      await sessionRepo.remove(session)

      const context = this.buildCreatePaymentContext(cart)

      const paymentResponse = await provider
        .withTransaction(transactionManager)
        .createPayment(context)

      const sessionData = paymentResponse.session_data ?? paymentResponse

      await this.processCollectedData(
        {
          customer: { id: context.customer?.id },
        },
        paymentResponse
      )

      return await this.saveSession(session.provider_id, {
        sessionData,
        cartId: cart.id,
        isSelected: true,
        status: PaymentSessionStatus.PENDING,
      })
    })
  }

  async refreshSessionNew(
    paymentSession: PaymentSession,
    sessionInput: Omit<PaymentSessionInput, "cart"> & {
      cart?: PaymentSessionInput["cart"]
    }
  ): Promise<PaymentSession> {
    return this.atomicPhase_(async (transactionManager) => {
      const session = await this.retrieveSession(paymentSession.id)
      const provider = this.retrieveProvider(paymentSession.provider_id)

      await provider.withTransaction(transactionManager).deletePayment(session)

      const sessionRepo = transactionManager.getCustomRepository(
        this.paymentSessionRepository_
      )

      await sessionRepo.remove(session)

      return await this.createSessionNew(sessionInput)
    })
  }

  /**
   * Updates an existing payment session.
   * @param paymentSession - the payment session object to
   *    update
   * @param cart - the cart object to update for
   * @return the updated payment session
   */
  async updateSession(
    paymentSession: PaymentSession,
    cart: Cart
  ): Promise<PaymentSession> {
    return await this.atomicPhase_(async (transactionManager) => {
      const session = await this.retrieveSession(paymentSession.id)
      const provider = this.retrieveProvider(paymentSession.provider_id)
      session.data = await provider
        .withTransaction(transactionManager)
        .updatePayment(paymentSession.data, cart)

      const sessionRepo = transactionManager.getCustomRepository(
        this.paymentSessionRepository_
      )
      return await sessionRepo.save(session)
    })
  }

  async updateSessionNew(
    paymentSession: PaymentSession,
    sessionInput: Omit<PaymentSessionInput, "cart"> & {
      cart?: PaymentSessionInput["cart"]
    }
  ): Promise<PaymentSession> {
    return await this.atomicPhase_(async (transactionManager) => {
      const session = await this.retrieveSession(paymentSession.id)
      const provider = this.retrieveProvider(paymentSession.provider_id)

      session.amount = sessionInput.amount
      paymentSession.data.amount = sessionInput.amount
      session.data = await provider
        .withTransaction(transactionManager)
        .updatePaymentNew(paymentSession.data, sessionInput)

      const sessionRepo = transactionManager.getCustomRepository(
        this.paymentSessionRepository_
      )

      return await sessionRepo.save(session)
    })
  }

  async deleteSession(
    paymentSession: PaymentSession
  ): Promise<PaymentSession | undefined> {
    return await this.atomicPhase_(async (transactionManager) => {
      const session = await this.retrieveSession(paymentSession.id).catch(
        () => void 0
      )

      if (!session) {
        return
      }

      const provider = this.retrieveProvider(paymentSession.provider_id)
      await provider
        .withTransaction(transactionManager)
        .deletePayment(paymentSession)

      const sessionRepo = transactionManager.getCustomRepository(
        this.paymentSessionRepository_
      )

      return await sessionRepo.remove(session)
    })
  }

  async deleteSessionNew(paymentSession: PaymentSession): Promise<void> {
    return await this.atomicPhase_(async (transactionManager) => {
      const provider = this.retrieveProvider(paymentSession.provider_id)
      return await provider
        .withTransaction(transactionManager)
        .deletePayment(paymentSession)
    })
  }

  /**
   * Finds a provider given an id
   * @param {string} providerId - the id of the provider to get
   * @return {PaymentService} the payment provider
   */
  retrieveProvider<
    TProvider extends AbstractPaymentService | typeof BasePaymentService
  >(
    providerId: string
  ): TProvider extends AbstractPaymentService
    ? AbstractPaymentService
    : typeof BasePaymentService {
    try {
      let provider
      if (providerId === "system") {
        provider = this.container_[`systemPaymentProviderService`]
      } else {
        provider = this.container_[`pp_${providerId}`]
      }

      return provider
    } catch (err) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Could not find a payment provider with id: ${providerId}`
      )
    }
  }

  async createPayment(data: {
    cart_id: string
    amount: number
    currency_code: string
    payment_session: PaymentSession
  }): Promise<Payment> {
    return await this.atomicPhase_(async (transactionManager) => {
      const { payment_session: paymentSession, currency_code, amount } = data

      const provider = this.retrieveProvider<AbstractPaymentService>(
        paymentSession.provider_id
      )
      const paymentData = await provider
        .withTransaction(transactionManager)
        .getPaymentData(paymentSession)

      const paymentRepo = transactionManager.getCustomRepository(
        this.paymentRepository_
      )

      const created = paymentRepo.create({
        provider_id: paymentSession.provider_id,
        amount,
        currency_code,
        data: paymentData,
        cart_id: data.cart_id,
      })

      return await paymentRepo.save(created)
    })
  }

  async createPaymentNew(
    paymentInput: Omit<PaymentProviderDataInput, "customer"> & {
      payment_session: PaymentSession
    }
  ): Promise<Payment> {
    return await this.atomicPhase_(async (transactionManager) => {
      const { payment_session, currency_code, amount, provider_id } =
        paymentInput

      const provider = this.retrieveProvider(provider_id)
      const paymentData = await provider
        .withTransaction(transactionManager)
        .getPaymentData(payment_session)

      const paymentService = this.container_.paymentService
      return await paymentService.withTransaction(transactionManager).create({
        provider_id,
        amount,
        currency_code,
        data: paymentData,
      })
    })
  }

  async updatePayment(
    paymentId: string,
    data: { order_id?: string; swap_id?: string }
  ): Promise<Payment> {
    return await this.atomicPhase_(async (transactionManager) => {
      const paymentService = this.container_.paymentService
      return await paymentService
        .withTransaction(transactionManager)
        .update(paymentId, data)
    })
  }

  async authorizePayment(
    paymentSession: PaymentSession,
    context: Record<string, unknown>
  ): Promise<PaymentSession | undefined> {
    return await this.atomicPhase_(async (transactionManager) => {
      const session = await this.retrieveSession(paymentSession.id).catch(
        () => void 0
      )

      if (!session) {
        return
      }

      const provider = this.retrieveProvider(paymentSession.provider_id)
      const { status, data } = await provider
        .withTransaction(transactionManager)
        .authorizePayment(session, context)

      session.data = data
      session.status = status

      if (
        this.featureFlagRouter_.isFeatureEnabled(OrderEditingFeatureFlag.key) &&
        status === PaymentSessionStatus.AUTHORIZED
      ) {
        session.payment_authorized_at = new Date()
      }

      const sessionRepo = transactionManager.getCustomRepository(
        this.paymentSessionRepository_
      )
      return await sessionRepo.save(session)
    })
  }

  async updateSessionData(
    paymentSession: PaymentSession,
    data: Record<string, unknown>
  ): Promise<PaymentSession> {
    return await this.atomicPhase_(async (transactionManager) => {
      const session = await this.retrieveSession(paymentSession.id)

      const provider = this.retrieveProvider(paymentSession.provider_id)

      session.data = await provider
        .withTransaction(transactionManager)
        .updatePaymentData(paymentSession.data, data)
      session.status = paymentSession.status

      const sessionRepo = transactionManager.getCustomRepository(
        this.paymentSessionRepository_
      )
      return await sessionRepo.save(session)
    })
  }

  async cancelPayment(
    paymentObj: Partial<Payment> & { id: string }
  ): Promise<Payment> {
    return await this.atomicPhase_(async (transactionManager) => {
      const payment = await this.retrievePayment(paymentObj.id)
      const provider = this.retrieveProvider(payment.provider_id)
      payment.data = await provider
        .withTransaction(transactionManager)
        .cancelPayment(payment)

      const now = new Date()
      payment.canceled_at = now.toISOString()

      const paymentRepo = transactionManager.getCustomRepository(
        this.paymentRepository_
      )
      return await paymentRepo.save(payment)
    })
  }

  async getStatus(payment: Payment): Promise<PaymentSessionStatus> {
    const provider = this.retrieveProvider(payment.provider_id)
    return await provider.withTransaction(this.manager_).getStatus(payment.data)
  }

  async capturePayment(
    paymentObj: Partial<Payment> & { id: string }
  ): Promise<Payment> {
    return await this.atomicPhase_(async (transactionManager) => {
      const payment = await this.retrievePayment(paymentObj.id)
      const provider = this.retrieveProvider(payment.provider_id)
      payment.data = await provider
        .withTransaction(transactionManager)
        .capturePayment(payment)

      const now = new Date()
      payment.captured_at = now.toISOString()

      const paymentRepo = transactionManager.getCustomRepository(
        this.paymentRepository_
      )
      return await paymentRepo.save(payment)
    })
  }

  async refundPayment(
    payObjs: Payment[],
    amount: number,
    reason: string,
    note?: string
  ): Promise<Refund> {
    return await this.atomicPhase_(async (transactionManager) => {
      const payments = await this.listPayments({
        id: payObjs.map((p) => p.id),
      })

      let order_id!: string
      const refundable = payments.reduce((acc, next) => {
        order_id = next.order_id
        if (next.captured_at) {
          return (acc += next.amount - next.amount_refunded)
        }

        return acc
      }, 0)

      if (refundable < amount) {
        throw new MedusaError(
          MedusaError.Types.NOT_ALLOWED,
          "Refund amount is greater that the refundable amount"
        )
      }

      let balance = amount

      const used: string[] = []

      const paymentRepo = transactionManager.getCustomRepository(
        this.paymentRepository_
      )

      let paymentToRefund = payments.find(
        (payment) => payment.amount - payment.amount_refunded > 0
      )

      while (paymentToRefund) {
        const currentRefundable =
          paymentToRefund.amount - paymentToRefund.amount_refunded

        const refundAmount = Math.min(currentRefundable, balance)

        const provider = this.retrieveProvider(paymentToRefund.provider_id)
        paymentToRefund.data = await provider
          .withTransaction(transactionManager)
          .refundPayment(paymentToRefund, refundAmount)

        paymentToRefund.amount_refunded += refundAmount
        await paymentRepo.save(paymentToRefund)

        balance -= refundAmount

        used.push(paymentToRefund.id)

        if (balance > 0) {
          paymentToRefund = payments.find(
            (payment) =>
              payment.amount - payment.amount_refunded > 0 &&
              !used.includes(payment.id)
          )
        } else {
          paymentToRefund = undefined
        }
      }

      const refundRepo = transactionManager.getCustomRepository(
        this.refundRepository_
      )

      const toCreate = {
        order_id,
        amount,
        reason,
        note,
      }

      const created = refundRepo.create(toCreate)
      return await refundRepo.save(created)
    })
  }

  async refundFromPayment(
    payment: Payment,
    amount: number,
    reason: string,
    note?: string
  ): Promise<Refund> {
    return await this.atomicPhase_(async (manager) => {
      const refundable = payment.amount - payment.amount_refunded

      if (refundable < amount) {
        throw new MedusaError(
          MedusaError.Types.NOT_ALLOWED,
          "Refund amount is greater that the refundable amount"
        )
      }

      const provider = this.retrieveProvider(payment.provider_id)
      payment.data = await provider
        .withTransaction(manager)
        .refundPayment(payment, amount)

      payment.amount_refunded += amount

      const paymentRepo = manager.getCustomRepository(this.paymentRepository_)
      await paymentRepo.save(payment)

      const refundRepo = manager.getCustomRepository(this.refundRepository_)

      const toCreate = {
        payment_id: payment.id,
        amount,
        reason,
        note,
      }

      const created = refundRepo.create(toCreate)
      return await refundRepo.save(created)
    })
  }

  async retrieveRefund(
    id: string,
    config: FindConfig<Refund> = {}
  ): Promise<Refund | never> {
    const refRepo = this.manager_.getCustomRepository(this.refundRepository_)
    const query = buildQuery({ id }, config)
    const refund = await refRepo.findOne(query)

    if (!refund) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `A refund with ${id} was not found`
      )
    }

    return refund
  }

  /**
   * Build the create session context for both legacy and new API
   * @param cartOrData
   * @protected
   */
  protected buildCreatePaymentContext(
    cartOrData: Cart | PaymentSessionInput
  ): Cart & PaymentContext {
    const cart =
      "object" in cartOrData && cartOrData.object === "cart"
        ? cartOrData
        : ((cartOrData as PaymentSessionInput).cart as Cart)

    const context = {} as Cart & PaymentContext

    // TODO: only to support legacy API. Once we are ready to break the API, the cartOrData will only support PaymentSessionInput
    if ("object" in cartOrData && cartOrData.object === "cart") {
      context.cart = {
        context: cart.context,
        shipping_address: cart.shipping_address,
        id: cart.id,
        email: cart.email,
        shipping_methods: cart.shipping_methods,
      }
      context.amount = cart.total!
      context.currency_code = cart.region?.currency_code
      context.collected_data = cart.customer?.metadata ?? {}
      Object.assign(context, cart)
    } else {
      const data = cartOrData as PaymentSessionInput
      context.cart = data.cart
      context.amount = data.amount
      context.currency_code = data.currency_code
      context.collected_data = data.customer?.metadata ?? {}
      Object.assign(context, cart)
    }

    return context
  }

  /**
   * Persist a Payment session data
   * @param providerId
   * @param data
   * @protected
   */
  protected async saveSession(
    providerId: string,
    data: {
      cartId?: string
      amount?: number
      sessionData: Record<string, unknown>
      isSelected?: boolean
      status: PaymentSessionStatus
    }
  ): Promise<PaymentSession> {
    const manager = this.transactionManager_ ?? this.manager_

    if (
      data.amount != null &&
      !this.featureFlagRouter_.isFeatureEnabled(OrderEditingFeatureFlag.key)
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "Unable to save the payment session with an amoutn. The feature flag order edit is not enabled."
      )
    }

    const sessionRepo = manager.getCustomRepository(
      this.paymentSessionRepository_
    )

    const toCreate = {
      cart_id: data.cartId,
      provider_id: providerId,
      data: data.sessionData,
      isSelected: data.isSelected,
      status: data.status,
    }

    const created = sessionRepo.create(toCreate)
    return await sessionRepo.save(created)
  }

  /**
   * Process the collected data. Can be used every time we need to process some collected data returned by the provide
   * @param data
   * @param paymentResponse
   * @protected
   */
  protected async processCollectedData(
    data: { customer?: { id?: string } } = {},
    paymentResponse: PaymentSessionResponse | Record<string, unknown>
  ): Promise<void> {
    const { collected_data } = paymentResponse as PaymentSessionResponse

    if (!collected_data) {
      return
    }

    const manager = this.transactionManager_ ?? this.manager_

    if (collected_data.customer && data.customer?.id) {
      await this.customerService_
        .withTransaction(manager)
        .update(data.customer.id, { metadata: collected_data.customer })
    }
  }
}
