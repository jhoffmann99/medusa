import { AbstractPaymentService } from "@medusajs/medusa"
import Stripe from "stripe"
import { isDefined } from "@medusajs/medusa/dist/utils";
import { MedusaError } from "medusa-core-utils";
import { PaymentSessionStatus } from "@medusajs/medusa/dist";

class StripeBase extends AbstractPaymentService {
  static identifier = null

  constructor(_, options) {
    super(_, options)

    /**
     * Required Stripe options:
     *  {
     *    api_key: "stripe_secret_key", REQUIRED
     *    webhook_secret: "stripe_webhook_secret", REQUIRED
     *    // Use this flag to capture payment immediately (default is false)
     *    capture: true
     *  }
     */
    this.options_ = options

    /** @private @const {Stripe} */
    this.stripe_ = Stripe(options.api_key)
  }

  getPaymentIntentOptions() {
    const options = {}

    if (this?.paymentIntentOptions?.capture_method) {
      options.capture_method = this.paymentIntentOptions.capture_method
    }

    if (this?.paymentIntentOptions?.setup_future_usage) {
      options.setup_future_usage = this.paymentIntentOptions.setup_future_usage
    }

    if (this?.paymentIntentOptions?.payment_method_types) {
      options.payment_method_types =
        this.paymentIntentOptions.payment_method_types
    }

    return options
  }

   /**
   * Get payment session status
   * statuses.
   * @param {PaymentSessionData} paymentData - the data stored with the payment session
   * @return {Promise<PaymentSessionStatus>} the status of the order
   */
  async getStatus(paymentData) {
    const { id } = paymentData
    const paymentIntent = await this.stripe_.paymentIntents.retrieve(id)

    switch (paymentIntent.status) {
      case "requires_payment_method":
      case "requires_confirmation":
      case "processing":
        return PaymentSessionStatus.PENDING
      case "requires_action":
        return PaymentSessionStatus.REQUIRES_MORE
      case "canceled":
        return PaymentSessionStatus.CANCELED
      case "requires_capture":
      case "succeeded":
        return PaymentSessionStatus.AUTHORIZED
      default:
        return PaymentSessionStatus.PENDING
    }
  }

  /**
   * Fetches a customers saved payment methods if registered in Stripe.
   * @param {Customer} customer - customer to fetch saved cards for
   * @return {Promise<Data[]>} saved payments methods
   */
  async retrieveSavedMethods(customer) {
    if (customer.metadata && customer.metadata.stripe_id) {
      const methods = await this.stripe_.paymentMethods.list({
        customer: customer.metadata.stripe_id,
        type: "card",
      })

      return methods.data
    }

    return []
  }

  /**
   * Fetches a Stripe customer
   * @param {string} customerId - Stripe customer id
   * @return {Promise<object>} Stripe customer
   */
  async retrieveCustomer(customerId) {
    if (!customerId) {
      return Promise.resolve()
    }
    return this.stripe_.customers.retrieve(customerId)
  }

  /**
   * Creates a Stripe payment intent.
   * If customer is not registered in Stripe, we do so.
   * @param {Cart & PaymentContext} context - context to use to create a payment for
   * @return {Promise<PaymentSessionResponse>} Stripe payment intent
   */
  async createPayment(context) {
    const intentRequestData = this.getPaymentIntentOptions()
    const { id: cart_id, email, context: cart_context, collected_data, currency_code, amount, resource_id } = context

    if (!isDefined(currency_code) || !isDefined(amount)) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        'Unable to create a new payment, one of the "currency_code" or "amount" values is not provided. Both values are required.'
      )
    }

    const intentRequest = {
      description:
        cart_context.payment_description ??
        this.options_?.payment_description,
      amount: Math.round(amount),
      currency: currency_code,
      metadata: { cart_id, resource_id },
      capture_method: this.options_.capture ? "automatic" : "manual",
      ...intentRequestData,
    }

    if (this.options_?.automatic_payment_methods) {
      intentRequest.automatic_payment_methods = { enabled: true }
    }

    if (collected_data?.stripe_id) {
      intentRequest.customer = collected_data.stripe_id
    } else {
      const stripeCustomer = await this.stripe_.customers.create({
        email,
      })

      intentRequest.customer = stripeCustomer.id
    }

    const session_data = await this.stripe_.paymentIntents.create(
      intentRequest
    )

    return {
      session_data,
			collected_data: {
				customer: {
					stripe_id: intentRequest.customer
				}
			}
    }
  }

  async createPaymentNew(paymentInput) {
    const intentRequestData = this.getPaymentIntentOptions()
    const { customer, currency_code, amount, resource_id, cart } = paymentInput
    const { email } = customer ?? {}

    const intentRequest = {
      description:
        cart?.context?.payment_description ??
        this.options_?.payment_description,
      amount: Math.round(amount),
      currency: currency_code,
      metadata: { resource_id },
      capture_method: this.options_.capture ? "automatic" : "manual",
      ...intentRequestData,
    }

    if (collected_data?.stripe_id) {
      intentRequest.customer = collected_data.stripe_id
    } else {
      const stripeCustomer = await this.stripe_.customers.create({
        email,
      })

      intentRequest.customer = stripeCustomer.id
    }

    const session_data = await this.stripe_.paymentIntents.create(intentRequest)

    return {
      session_data,
			collected_data: {
				customer: {
					stripe_id: intentRequest.customer
				}
			}
    }
  }

  /**
   * Retrieves Stripe payment intent.
   * @param {PaymentData} paymentData - the data of the payment to retrieve
   * @return {Promise<Data>} Stripe payment intent
   */
  async retrievePayment(data) {
    try {
      return await this.stripe_.paymentIntents.retrieve(data.id)
    } catch (error) {
      throw error
    }
  }

  /**
   * Gets a Stripe payment intent and returns it.
   * @param {PaymentSession} paymentSession - the data of the payment to retrieve
   * @return {Promise<PaymentData>} Stripe payment intent
   */
  async getPaymentData(paymentSession) {
    try {
      return await this.stripe_.paymentIntents.retrieve(paymentSession.data.id)
    } catch (error) {
      throw error
    }
  }

  /**
   * Authorizes Stripe payment intent by simply returning
   * the status for the payment intent in use.
   * @param {PaymentSession} paymentSession - payment session data
   * @param {Data} context - properties relevant to current context
   * @return {Promise<{ data: PaymentSessionData; status: PaymentSessionStatus }>} result with data and status
   */
  async authorizePayment(paymentSession, context = {}) {
    const stat = await this.getStatus(paymentSession.data)
    try {
      return { data: paymentSession.data, status: stat }
    } catch (error) {
      throw error
    }
  }

  async updatePaymentData(sessionData, update) {
    try {
      return await this.stripe_.paymentIntents.update(sessionData.id, {
        ...update.data,
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * Updates Stripe payment intent.
   * @param {PaymentSessionData} paymentSessionData - payment session data.
   * @param {Cart} cart
   * @return {Promise<PaymentSessionData>} Stripe payment intent
   */
  async updatePayment(paymentSessionData, cart) {
    try {
      const stripeId = cart.customer?.metadata?.stripe_id || undefined

      if (stripeId !== paymentSessionData.customer) {
        return await this.createPayment(cart)
      } else {
        if (
          cart.total &&
          paymentSessionData.amount === Math.round(cart.total)
        ) {
          return paymentSessionData
        }

        return await this.stripe_.paymentIntents.update(paymentSessionData.id, {
          amount: Math.round(cart.total),
        })
      }
    } catch (error) {
      throw error
    }
  }

  async updatePaymentNew(paymentSessionData, paymentInput) {
    try {
      const stripeId = paymentInput.customer?.metadata?.stripe_id

      if (stripeId !== paymentSessionData.customer) {
        return await this.createPaymentNew(paymentInput)
      } else {
        if (paymentSessionData.amount === Math.round(paymentInput.amount)) {
          return paymentSessionData
        }

        return await this.stripe_.paymentIntents.update(paymentSessionData.id, {
          amount: Math.round(paymentInput.amount),
        })
      }
    } catch (error) {
      throw error
    }
  }

  async deletePayment(payment) {
    try {
      const { id } = payment.data
      return this.stripe_.paymentIntents.cancel(id).catch((err) => {
        if (err.statusCode === 400) {
          return
        }
        throw err
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * Updates customer of Stripe payment intent.
   * @param {string} paymentIntentId - id of payment intent to update
   * @param {string} customerId - id of new Stripe customer
   * @return {object} Stripe payment intent
   */
  async updatePaymentIntentCustomer(paymentIntentId, customerId) {
    try {
      return await this.stripe_.paymentIntents.update(paymentIntentId, {
        customer: customerId,
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * Captures payment for Stripe payment intent.
   * @param {Payment} payment - payment method data from cart
   * @return {Promise<PaymentData>} Stripe payment intent
   */
  async capturePayment(payment) {
    const { id } = payment.data
    try {
      const intent = await this.stripe_.paymentIntents.capture(id)
      return intent
    } catch (error) {
      if (error.code === "payment_intent_unexpected_state") {
        if (error.payment_intent.status === "succeeded") {
          return error.payment_intent
        }
      }
      throw error
    }
  }

  /**
   * Refunds payment for Stripe payment intent.
   * @param {Payment} payment - payment method data from cart
   * @param {number} refundAmount - amount to refund
   * @return {Promise<PaymentData>} refunded payment intent
   */
  async refundPayment(payment, amountToRefund) {
    const { id } = payment.data
    try {
      await this.stripe_.refunds.create({
        amount: Math.round(amountToRefund),
        payment_intent: id,
      })

      return payment.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Cancels payment for Stripe payment intent.
   * @param {Payment} payment - payment method data from cart
   * @return {Promise<PaymentData>} canceled payment intent
   */
  async cancelPayment(payment) {
    const { id } = payment.data
    try {
      return await this.stripe_.paymentIntents.cancel(id)
    } catch (error) {
      if (error.payment_intent.status === "canceled") {
        return error.payment_intent
      }

      throw error
    }
  }

  /**
   * Constructs Stripe Webhook event
   * @param {object} data - the data of the webhook request: req.body
   * @param {object} signature - the Stripe signature on the event, that
   *    ensures integrity of the webhook event
   * @return {object} Stripe Webhook event
   */
  constructWebhookEvent(data, signature) {
    return this.stripe_.webhooks.constructEvent(
      data,
      signature,
      this.options_.webhook_secret
    )
  }
}

export default StripeBase
