import { MedusaError } from "medusa-core-utils"
import { BaseService } from "medusa-interfaces"
import { EntityManager } from "typeorm"
import { EventBusService } from "."
import { DiscountConditionType } from "../models"
import { DiscountConditionRepository } from "../repositories/discount-condition"
import { DiscountRuleRepository } from "../repositories/discount-rule"
import { UpsertDiscountConditionInput } from "../types/discount"
import { PostgresError } from "../utils/exception-formatter"
import DiscountService from "./discount"

/**
 * Provides layer to manipulate discounts.
 * @implements {BaseService}
 */
class DiscountConditionService extends BaseService {
  private manager_: EntityManager
  private discountRuleRepository_: typeof DiscountRuleRepository
  private discountService_: DiscountService
  private discountConditionRepository_: typeof DiscountConditionRepository
  private eventBus_: EventBusService

  constructor({
    manager,
    discountRuleRepository,
    discountService,
    discountConditionRepository,
    eventBusService,
  }) {
    super()

    /** @private @const {EntityManager} */
    this.manager_ = manager

    /** @private @const {DiscountRuleRepository} */
    this.discountRuleRepository_ = discountRuleRepository

    /** @private @const {DiscountService} */
    this.discountService_ = discountService

    /** @private @const {DiscountConditionRepository} */
    this.discountConditionRepository_ = discountConditionRepository

    /** @private @const {EventBus} */
    this.eventBus_ = eventBusService
  }

  withTransaction(transactionManager: EntityManager): DiscountConditionService {
    if (!transactionManager) {
      return this
    }

    const cloned = new DiscountConditionService({
      manager: transactionManager,
      discountRuleRepository: this.discountRuleRepository_,
      discountService: this.discountService_,
      discountConditionRepository: this.discountConditionRepository_,
      eventBusService: this.eventBus_,
    })

    cloned.transactionManager_ = transactionManager
    cloned.manager_ = transactionManager

    return cloned
  }

  resolveConditionType_(data: UpsertDiscountConditionInput):
    | {
        type: DiscountConditionType
        resource_ids: string[]
      }
    | undefined {
    switch (true) {
      case !!data.products?.length:
        return {
          type: DiscountConditionType.PRODUCTS,
          resource_ids: data.products!,
        }
      case !!data.product_collections?.length:
        return {
          type: DiscountConditionType.PRODUCT_COLLECTIONS,
          resource_ids: data.product_collections!,
        }
      case !!data.product_types?.length:
        return {
          type: DiscountConditionType.PRODUCT_TYPES,
          resource_ids: data.product_types!,
        }
      case !!data.product_tags?.length:
        return {
          type: DiscountConditionType.PRODUCT_TAGS,
          resource_ids: data.product_tags!,
        }
      case !!data.customer_groups?.length:
        return {
          type: DiscountConditionType.CUSTOMER_GROUPS,
          resource_ids: data.customer_groups!,
        }
      default:
        return undefined
    }
  }

  async upsertCondition(
    discountId: string,
    data: UpsertDiscountConditionInput
  ): Promise<void> {
    const resolvedConditionType = this.resolveConditionType_(data)

    const res = this.atomicPhase_(
      async (manager) => {
        const discountConditionRepo: DiscountConditionRepository =
          manager.getCustomRepository(this.discountConditionRepository_)

        if (!resolvedConditionType) {
          throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            `Missing one of products, collections, tags, types or customer groups in data`
          )
        }

        if (data.id) {
          return await discountConditionRepo.addConditionResources(
            data.id,
            resolvedConditionType.resource_ids,
            resolvedConditionType.type,
            true
          )
        }

        const discount = await this.discountService_
          .withTransaction(manager)
          .retrieve(discountId, {
            relations: ["rule", "rule.conditions"],
          })

        const created = discountConditionRepo.create({
          discount_rule_id: discount.rule_id,
          operator: data.operator,
          type: resolvedConditionType.type,
        })

        const discountCondition = await discountConditionRepo.save(created)

        return await discountConditionRepo.addConditionResources(
          discountCondition.id,
          resolvedConditionType.resource_ids,
          resolvedConditionType.type
        )
      },
      async (err: { code: string }) => {
        if (err.code === PostgresError.DUPLICATE_ERROR) {
          // A unique key constraint failed meaning the combination of
          // discount rule id, type, and operator already exists in the db.
          throw new MedusaError(
            MedusaError.Types.DUPLICATE_ERROR,
            `Discount Condition with operator '${data.operator}' and type '${resolvedConditionType?.type}' already exist on a Discount Rule`
          )
        }
      }
    )

    return res
  }

  async remove(discountConditionId): Promise<void> {
    return this.atomicPhase_(async (manager) => {
      const conditionRepo = manager.getCustomRepository(
        this.discountConditionRepository_
      )

      const condition = await conditionRepo.findOne({
        where: { id: discountConditionId },
      })

      if (!condition) {
        return Promise.resolve()
      }

      await conditionRepo.remove(condition)

      return Promise.resolve()
    })
  }

  async canApplyForCustomer(
    discountRuleId: string,
    customerId: string | undefined
  ): Promise<boolean> {
    return this.atomicPhase_(async (manager) => {
      const discountConditionRepo: DiscountConditionRepository =
        manager.getCustomRepository(this.discountConditionRepository_)

      // Instead of throwing on missing customer id, we simply invalidate the discount
      if (!customerId) {
        return false
      }

      const customer = await this.customerService_.retrieve(customerId, {
        relations: ["groups"],
      })

      return await discountConditionRepo.canApplyForCustomer(
        discountRuleId,
        customer.id
      )
    })
  }
}

export default DiscountConditionService