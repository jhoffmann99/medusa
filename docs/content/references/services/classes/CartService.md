# Class: CartService

## Hierarchy

- `TransactionBaseService`

  ↳ **`CartService`**

## Constructors

### constructor

• **new CartService**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `InjectedDependencies` |

#### Overrides

TransactionBaseService.constructor

#### Defined in

[packages/medusa/src/services/cart.ts:129](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L129)

## Properties

### \_\_configModule\_\_

• `Protected` `Optional` `Readonly` **\_\_configModule\_\_**: `Record`<`string`, `unknown`\>

#### Inherited from

TransactionBaseService.\_\_configModule\_\_

#### Defined in

[packages/medusa/src/interfaces/transaction-base-service.ts:10](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/interfaces/transaction-base-service.ts#L10)

___

### \_\_container\_\_

• `Protected` `Readonly` **\_\_container\_\_**: `any`

#### Inherited from

TransactionBaseService.\_\_container\_\_

#### Defined in

[packages/medusa/src/interfaces/transaction-base-service.ts:9](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/interfaces/transaction-base-service.ts#L9)

___

### addressRepository\_

• `Protected` `Readonly` **addressRepository\_**: typeof `AddressRepository`

#### Defined in

[packages/medusa/src/services/cart.ts:105](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L105)

___

### cartRepository\_

• `Protected` `Readonly` **cartRepository\_**: typeof `CartRepository`

#### Defined in

[packages/medusa/src/services/cart.ts:104](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L104)

___

### customShippingOptionService\_

• `Protected` `Readonly` **customShippingOptionService\_**: [`CustomShippingOptionService`](CustomShippingOptionService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:124](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L124)

___

### customerService\_

• `Protected` `Readonly` **customerService\_**: [`CustomerService`](CustomerService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:116](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L116)

___

### discountService\_

• `Protected` `Readonly` **discountService\_**: [`DiscountService`](DiscountService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:118](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L118)

___

### eventBus\_

• `Protected` `Readonly` **eventBus\_**: [`EventBusService`](EventBusService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:108](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L108)

___

### featureFlagRouter\_

• `Protected` `Readonly` **featureFlagRouter\_**: `FlagRouter`

#### Defined in

[packages/medusa/src/services/cart.ts:127](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L127)

___

### giftCardService\_

• `Protected` `Readonly` **giftCardService\_**: [`GiftCardService`](GiftCardService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:119](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L119)

___

### inventoryService\_

• `Protected` `Readonly` **inventoryService\_**: [`InventoryService`](InventoryService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:123](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L123)

___

### lineItemAdjustmentService\_

• `Protected` `Readonly` **lineItemAdjustmentService\_**: [`LineItemAdjustmentService`](LineItemAdjustmentService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:126](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L126)

___

### lineItemRepository\_

• `Protected` `Readonly` **lineItemRepository\_**: typeof `LineItemRepository`

#### Defined in

[packages/medusa/src/services/cart.ts:107](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L107)

___

### lineItemService\_

• `Protected` `Readonly` **lineItemService\_**: [`LineItemService`](LineItemService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:114](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L114)

___

### manager\_

• `Protected` **manager\_**: `EntityManager`

#### Overrides

TransactionBaseService.manager\_

#### Defined in

[packages/medusa/src/services/cart.ts:100](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L100)

___

### newTotalsService\_

• `Protected` `Readonly` **newTotalsService\_**: [`NewTotalsService`](NewTotalsService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:122](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L122)

___

### paymentProviderService\_

• `Protected` `Readonly` **paymentProviderService\_**: [`PaymentProviderService`](PaymentProviderService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:115](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L115)

___

### paymentSessionRepository\_

• `Protected` `Readonly` **paymentSessionRepository\_**: typeof `PaymentSessionRepository`

#### Defined in

[packages/medusa/src/services/cart.ts:106](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L106)

___

### priceSelectionStrategy\_

• `Protected` `Readonly` **priceSelectionStrategy\_**: `IPriceSelectionStrategy`

#### Defined in

[packages/medusa/src/services/cart.ts:125](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L125)

___

### productService\_

• `Protected` `Readonly` **productService\_**: [`ProductService`](ProductService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:110](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L110)

___

### productVariantService\_

• `Protected` `Readonly` **productVariantService\_**: [`ProductVariantService`](ProductVariantService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:109](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L109)

___

### regionService\_

• `Protected` `Readonly` **regionService\_**: [`RegionService`](RegionService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:113](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L113)

___

### salesChannelService\_

• `Protected` `Readonly` **salesChannelService\_**: [`SalesChannelService`](SalesChannelService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:112](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L112)

___

### shippingMethodRepository\_

• `Protected` `Readonly` **shippingMethodRepository\_**: typeof `ShippingMethodRepository`

#### Defined in

[packages/medusa/src/services/cart.ts:103](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L103)

___

### shippingOptionService\_

• `Protected` `Readonly` **shippingOptionService\_**: [`ShippingOptionService`](ShippingOptionService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:117](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L117)

___

### storeService\_

• `Protected` `Readonly` **storeService\_**: [`StoreService`](StoreService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:111](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L111)

___

### taxProviderService\_

• `Protected` `Readonly` **taxProviderService\_**: [`TaxProviderService`](TaxProviderService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:120](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L120)

___

### totalsService\_

• `Protected` `Readonly` **totalsService\_**: [`TotalsService`](TotalsService.md)

#### Defined in

[packages/medusa/src/services/cart.ts:121](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L121)

___

### transactionManager\_

• `Protected` **transactionManager\_**: `undefined` \| `EntityManager`

#### Overrides

TransactionBaseService.transactionManager\_

#### Defined in

[packages/medusa/src/services/cart.ts:101](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L101)

___

### Events

▪ `Static` `Readonly` **Events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `CREATED` | `string` |
| `CUSTOMER_UPDATED` | `string` |
| `UPDATED` | `string` |

#### Defined in

[packages/medusa/src/services/cart.ts:94](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L94)

## Methods

### addLineItem

▸ **addLineItem**(`cartId`, `lineItem`, `config?`): `Promise`<`void`\>

Adds a line item to the cart.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `cartId` | `string` | `undefined` | the id of the cart that we will add to |
| `lineItem` | `LineItem` | `undefined` | the line item to add. |
| `config` | `Object` | `undefined` | validateSalesChannels - should check if product belongs to the same sales chanel as cart                            (if cart has associated sales channel) |
| `config.validateSalesChannels` | `boolean` | `true` | - |

#### Returns

`Promise`<`void`\>

the result of the update operation

#### Defined in

[packages/medusa/src/services/cart.ts:587](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L587)

___

### addShippingMethod

▸ **addShippingMethod**(`cartId`, `optionId`, `data?`): `Promise`<`Cart`\>

Adds the shipping method to the list of shipping methods associated with
the cart. Shipping Methods are the ways that an order is shipped, whereas a
Shipping Option is a possible way to ship an order. Shipping Methods may
also have additional details in the data field such as an id for a package
shop.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartId` | `string` | the id of the cart to add shipping method to |
| `optionId` | `string` | id of shipping option to add as valid method |
| `data` | `Record`<`string`, `unknown`\> | the fulmillment data for the method |

#### Returns

`Promise`<`Cart`\>

the result of the update operation

#### Defined in

[packages/medusa/src/services/cart.ts:1642](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1642)

___

### adjustFreeShipping\_

▸ `Protected` **adjustFreeShipping_**(`cart`, `shouldAdd`): `Promise`<`void`\>

Ensures shipping total on cart is correct in regards to a potential free
shipping discount
If a free shipping is present, we set shipping methods price to 0
if a free shipping was present, we set shipping methods to original amount

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cart` | `Cart` | the the cart to adjust free shipping for |
| `shouldAdd` | `boolean` | flag to indicate, if we should add or remove |

#### Returns

`Promise`<`void`\>

void

#### Defined in

[packages/medusa/src/services/cart.ts:749](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L749)

___

### applyDiscount

▸ **applyDiscount**(`cart`, `discountCode`): `Promise`<`void`\>

Updates the cart's discounts.
If discount besides free shipping is already applied, this
will be overwritten
Throws if discount regions does not include the cart region

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cart` | `Cart` | the cart to update |
| `discountCode` | `string` | the discount code |

#### Returns

`Promise`<`void`\>

the result of the update operation

#### Defined in

[packages/medusa/src/services/cart.ts:1170](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1170)

___

### applyGiftCard\_

▸ `Protected` **applyGiftCard_**(`cart`, `code`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cart` | `Cart` |
| `code` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/medusa/src/services/cart.ts:1134](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1134)

___

### atomicPhase\_

▸ `Protected` **atomicPhase_**<`TResult`, `TError`\>(`work`, `isolationOrErrorHandler?`, `maybeErrorHandlerOrDontFail?`): `Promise`<`TResult`\>

Wraps some work within a transactional block. If the service already has
a transaction manager attached this will be reused, otherwise a new
transaction manager is created.

#### Type parameters

| Name |
| :------ |
| `TResult` |
| `TError` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `work` | (`transactionManager`: `EntityManager`) => `Promise`<`TResult`\> | the transactional work to be done |
| `isolationOrErrorHandler?` | `IsolationLevel` \| (`error`: `TError`) => `Promise`<`void` \| `TResult`\> | the isolation level to be used for the work. |
| `maybeErrorHandlerOrDontFail?` | (`error`: `TError`) => `Promise`<`void` \| `TResult`\> | Potential error handler |

#### Returns

`Promise`<`TResult`\>

the result of the transactional work

#### Inherited from

TransactionBaseService.atomicPhase\_

#### Defined in

[packages/medusa/src/interfaces/transaction-base-service.ts:48](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/interfaces/transaction-base-service.ts#L48)

___

### authorizePayment

▸ **authorizePayment**(`cartId`, `context?`): `Promise`<`Cart`\>

Authorizes a payment for a cart.
Will authorize with chosen payment provider. This will return
a payment object, that we will use to update our cart payment with.
Additionally, if the payment does not require more or fails, we will
set the payment on the cart.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartId` | `string` | the id of the cart to authorize payment for |
| `context` | `Record`<`string`, `unknown`\> & { `cart_id`: `string`  } | object containing whatever is relevant for    authorizing the payment with the payment provider. As an example,    this could be IP address or similar for fraud handling. |

#### Returns

`Promise`<`Cart`\>

the resulting cart

#### Defined in

[packages/medusa/src/services/cart.ts:1316](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1316)

___

### create

▸ **create**(`data`): `Promise`<`Cart`\>

Creates a cart.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `CartCreateProps` | the data to create the cart with |

#### Returns

`Promise`<`Cart`\>

the result of the create operation

#### Defined in

[packages/medusa/src/services/cart.ts:305](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L305)

___

### createOrFetchUserFromEmail\_

▸ `Protected` **createOrFetchUserFromEmail_**(`email`): `Promise`<`Customer`\>

Creates or fetches a user based on an email.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `email` | `string` | the email to use |

#### Returns

`Promise`<`Customer`\>

the resultign customer object

#### Defined in

[packages/medusa/src/services/cart.ts:1019](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1019)

___

### createTaxLines

▸ **createTaxLines**(`cartOrId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cartOrId` | `string` \| `Cart` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/medusa/src/services/cart.ts:2049](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L2049)

___

### decorateTotals

▸ **decorateTotals**(`cart`, `totalsConfig?`): `Promise`<`WithRequiredProperty`<`Cart`, ``"total"``\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cart` | `Cart` |
| `totalsConfig` | `TotalsConfig` |

#### Returns

`Promise`<`WithRequiredProperty`<`Cart`, ``"total"``\>\>

#### Defined in

[packages/medusa/src/services/cart.ts:2099](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L2099)

___

### decorateTotals\_

▸ `Protected` **decorateTotals_**(`cart`, `totalsToSelect`, `options?`): `Promise`<`Cart`\>

**`Deprecated`**

Use decorateTotals instead

#### Parameters

| Name | Type |
| :------ | :------ |
| `cart` | `Cart` |
| `totalsToSelect` | `TotalField`[] |
| `options` | `TotalsConfig` |

#### Returns

`Promise`<`Cart`\>

#### Defined in

[packages/medusa/src/services/cart.ts:2271](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L2271)

___

### delete

▸ **delete**(`cartId`): `Promise`<`Cart`\>

Deletes a cart from the database. Completed carts cannot be deleted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartId` | `string` | the id of the cart to delete |

#### Returns

`Promise`<`Cart`\>

the deleted cart or undefined if the cart was not found.

#### Defined in

[packages/medusa/src/services/cart.ts:1964](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1964)

___

### deletePaymentSession

▸ **deletePaymentSession**(`cartId`, `providerId`): `Promise`<`Cart`\>

Removes a payment session from the cart.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartId` | `string` | the id of the cart to remove from |
| `providerId` | `string` | the id of the provider whoose payment session    should be removed. |

#### Returns

`Promise`<`Cart`\>

the resulting cart.

#### Defined in

[packages/medusa/src/services/cart.ts:1550](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1550)

___

### deleteTaxLines

▸ **deleteTaxLines**(`id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/medusa/src/services/cart.ts:2080](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L2080)

___

### findCustomShippingOption

▸ **findCustomShippingOption**(`cartCustomShippingOptions`, `optionId`): `undefined` \| `CustomShippingOption`

Finds the cart's custom shipping options based on the passed option id.
throws if custom options is not empty and no shipping option corresponds to optionId

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartCustomShippingOptions` | `CustomShippingOption`[] | the cart's custom shipping options |
| `optionId` | `string` | id of the normal or custom shipping option to find in the cartCustomShippingOptions |

#### Returns

`undefined` \| `CustomShippingOption`

custom shipping option

#### Defined in

[packages/medusa/src/services/cart.ts:1750](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1750)

___

### getTotalsRelations

▸ `Private` **getTotalsRelations**(`config`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `FindConfig`<`Cart`\> |

#### Returns

`string`[]

#### Defined in

[packages/medusa/src/services/cart.ts:2322](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L2322)

___

### getValidatedSalesChannel

▸ `Protected` **getValidatedSalesChannel**(`salesChannelId?`): `Promise`<`SalesChannel`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `salesChannelId?` | `string` |

#### Returns

`Promise`<`SalesChannel`\>

#### Defined in

[packages/medusa/src/services/cart.ts:427](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L427)

___

### list

▸ **list**(`selector`, `config?`): `Promise`<`Cart`[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selector` | `FilterableCartProps` | the query object for find |
| `config` | `FindConfig`<`Cart`\> | config object |

#### Returns

`Promise`<`Cart`[]\>

the result of the find operation

#### Defined in

[packages/medusa/src/services/cart.ts:193](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L193)

___

### onSalesChannelChange

▸ `Protected` **onSalesChannelChange**(`cart`, `newSalesChannelId`): `Promise`<`void`\>

Remove the cart line item that does not belongs to the newly assigned sales channel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cart` | `Cart` | The cart being updated |
| `newSalesChannelId` | `string` | The new sales channel being assigned to the cart |

#### Returns

`Promise`<`void`\>

void

#### Defined in

[packages/medusa/src/services/cart.ts:965](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L965)

___

### refreshAdjustments\_

▸ `Protected` **refreshAdjustments_**(`cart`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cart` | `Cart` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/medusa/src/services/cart.ts:2193](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L2193)

___

### refreshPaymentSession

▸ **refreshPaymentSession**(`cartId`, `providerId`): `Promise`<`Cart`\>

Refreshes a payment session on a cart

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartId` | `string` | the id of the cart to remove from |
| `providerId` | `string` | the id of the provider whoose payment session    should be removed. |

#### Returns

`Promise`<`Cart`\>

the resulting cart.

#### Defined in

[packages/medusa/src/services/cart.ts:1598](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1598)

___

### removeDiscount

▸ **removeDiscount**(`cartId`, `discountCode`): `Promise`<`Cart`\>

Removes a discount based on a discount code.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartId` | `string` | the id of the cart to remove from |
| `discountCode` | `string` | the discount code to remove |

#### Returns

`Promise`<`Cart`\>

the resulting cart

#### Defined in

[packages/medusa/src/services/cart.ts:1230](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1230)

___

### removeLineItem

▸ **removeLineItem**(`cartId`, `lineItemId`): `Promise`<`Cart`\>

Removes a line item from the cart.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartId` | `string` | the id of the cart that we will remove from |
| `lineItemId` | `string` | the line item to remove. |

#### Returns

`Promise`<`Cart`\>

the result of the update operation

#### Defined in

[packages/medusa/src/services/cart.ts:459](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L459)

___

### retrieve

▸ **retrieve**(`cartId`, `options?`, `totalsConfig?`): `Promise`<`Cart`\>

Gets a cart by id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartId` | `string` | the id of the cart to get. |
| `options` | `FindConfig`<`Cart`\> | the options to get a cart |
| `totalsConfig` | `TotalsConfig` |  |

#### Returns

`Promise`<`Cart`\>

the cart document.

#### Defined in

[packages/medusa/src/services/cart.ts:211](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L211)

___

### retrieveLegacy

▸ `Protected` **retrieveLegacy**(`cartId`, `options?`, `totalsConfig?`): `Promise`<`Cart`\>

**`Deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `cartId` | `string` |
| `options` | `FindConfig`<`Cart`\> |
| `totalsConfig` | `TotalsConfig` |

#### Returns

`Promise`<`Cart`\>

#### Defined in

[packages/medusa/src/services/cart.ts:253](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L253)

___

### retrieveWithTotals

▸ **retrieveWithTotals**(`cartId`, `options?`, `totalsConfig?`): `Promise`<`WithRequiredProperty`<`Cart`, ``"total"``\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cartId` | `string` |
| `options` | `FindConfig`<`Cart`\> |
| `totalsConfig` | `TotalsConfig` |

#### Returns

`Promise`<`WithRequiredProperty`<`Cart`, ``"total"``\>\>

#### Defined in

[packages/medusa/src/services/cart.ts:285](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L285)

___

### setMetadata

▸ **setMetadata**(`cartId`, `key`, `value`): `Promise`<`Cart`\>

Dedicated method to set metadata for a cart.
To ensure that plugins does not overwrite each
others metadata fields, setMetadata is provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartId` | `string` | the cart to apply metadata to. |
| `key` | `string` | key for metadata field |
| `value` | `string` \| `number` | value for metadata field. |

#### Returns

`Promise`<`Cart`\>

resolves to the updated result.

#### Defined in

[packages/medusa/src/services/cart.ts:2007](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L2007)

___

### setPaymentSession

▸ **setPaymentSession**(`cartId`, `providerId`): `Promise`<`Cart`\>

Sets a payment method for a cart.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartId` | `string` | the id of the cart to add payment method to |
| `providerId` | `string` | the id of the provider to be set to the cart |

#### Returns

`Promise`<`Cart`\>

result of update operation

#### Defined in

[packages/medusa/src/services/cart.ts:1391](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1391)

___

### setPaymentSessions

▸ **setPaymentSessions**(`cartOrCartId`): `Promise`<`void`\>

Creates, updates and sets payment sessions associated with the cart. The
first time the method is called payment sessions will be created for each
provider. Additional calls will ensure that payment sessions have correct
amounts, currencies, etc. as well as make sure to filter payment sessions
that are not available for the cart's region.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartOrCartId` | `string` \| `Cart` | the id of the cart to set payment session for |

#### Returns

`Promise`<`void`\>

the result of the update operation.

#### Defined in

[packages/medusa/src/services/cart.ts:1457](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1457)

___

### setRegion\_

▸ `Protected` **setRegion_**(`cart`, `regionId`, `countryCode`): `Promise`<`void`\>

Set's the region of a cart.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cart` | `Cart` | the cart to set region on |
| `regionId` | `string` | the id of the region to set the region to |
| `countryCode` | ``null`` \| `string` | the country code to set the country to |

#### Returns

`Promise`<`void`\>

the result of the update operation

#### Defined in

[packages/medusa/src/services/cart.ts:1830](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1830)

___

### shouldRetryTransaction\_

▸ `Protected` **shouldRetryTransaction_**(`err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Record`<`string`, `unknown`\> \| { `code`: `string`  } |

#### Returns

`boolean`

#### Inherited from

TransactionBaseService.shouldRetryTransaction\_

#### Defined in

[packages/medusa/src/interfaces/transaction-base-service.ts:29](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/interfaces/transaction-base-service.ts#L29)

___

### transformQueryForTotals\_

▸ `Protected` **transformQueryForTotals_**(`config`): `FindConfig`<`Cart`\> & { `totalsToSelect`: `TotalField`[]  }

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `FindConfig`<`Cart`\> |

#### Returns

`FindConfig`<`Cart`\> & { `totalsToSelect`: `TotalField`[]  }

#### Defined in

[packages/medusa/src/services/cart.ts:2213](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L2213)

___

### update

▸ **update**(`cartId`, `data`): `Promise`<`Cart`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cartId` | `string` |
| `data` | `CartUpdateProps` |

#### Returns

`Promise`<`Cart`\>

#### Defined in

[packages/medusa/src/services/cart.ts:792](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L792)

___

### updateBillingAddress\_

▸ `Protected` **updateBillingAddress_**(`cart`, `addressOrId`, `addrRepo`): `Promise`<`void`\>

Updates the cart's billing address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cart` | `Cart` | the cart to update |
| `addressOrId` | `string` \| `AddressPayload` \| `Partial`<`Address`\> | the value to set the billing address to |
| `addrRepo` | `AddressRepository` | the repository to use for address updates |

#### Returns

`Promise`<`void`\>

the result of the update operation

#### Defined in

[packages/medusa/src/services/cart.ts:1045](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1045)

___

### updateCustomerId\_

▸ `Protected` **updateCustomerId_**(`cart`, `customerId`): `Promise`<`void`\>

Sets the customer id of a cart

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cart` | `Cart` | the cart to add email to |
| `customerId` | `string` | the customer to add to cart |

#### Returns

`Promise`<`void`\>

the result of the update operation

#### Defined in

[packages/medusa/src/services/cart.ts:1001](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1001)

___

### updateLineItem

▸ **updateLineItem**(`cartId`, `lineItemId`, `lineItemUpdate`): `Promise`<`Cart`\>

Updates a cart's existing line item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartId` | `string` | the id of the cart to update |
| `lineItemId` | `string` | the id of the line item to update. |
| `lineItemUpdate` | `LineItemUpdate` | the line item to update. Must include an id field. |

#### Returns

`Promise`<`Cart`\>

the result of the update operation

#### Defined in

[packages/medusa/src/services/cart.ts:684](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L684)

___

### updatePaymentSession

▸ **updatePaymentSession**(`cartId`, `update`): `Promise`<`Cart`\>

Updates the currently selected payment session.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cartId` | `string` | the id of the cart to update the payment session for |
| `update` | `Record`<`string`, `unknown`\> | the data to update the payment session with |

#### Returns

`Promise`<`Cart`\>

the resulting cart

#### Defined in

[packages/medusa/src/services/cart.ts:1278](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1278)

___

### updateShippingAddress\_

▸ `Protected` **updateShippingAddress_**(`cart`, `addressOrId`, `addrRepo`): `Promise`<`void`\>

Updates the cart's shipping address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cart` | `Cart` | the cart to update |
| `addressOrId` | `string` \| `AddressPayload` \| `Partial`<`Address`\> | the value to set the shipping address to |
| `addrRepo` | `AddressRepository` | the repository to use for address updates |

#### Returns

`Promise`<`void`\>

the result of the update operation

#### Defined in

[packages/medusa/src/services/cart.ts:1085](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1085)

___

### updateUnitPrices\_

▸ `Protected` **updateUnitPrices_**(`cart`, `regionId?`, `customer_id?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cart` | `Cart` |
| `regionId?` | `string` |
| `customer_id?` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/medusa/src/services/cart.ts:1769](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L1769)

___

### validateLineItem

▸ `Protected` **validateLineItem**(`sales_channel_id`, `lineItem`): `Promise`<`boolean`\>

Check if line item's variant belongs to the cart's sales channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sales_channel_id` | `Object` | the cart for the line item |
| `sales_channel_id.sales_channel_id` | ``null`` \| `string` | - |
| `lineItem` | `LineItem` | the line item being added |

#### Returns

`Promise`<`boolean`\>

a boolean indicating validation result

#### Defined in

[packages/medusa/src/services/cart.ts:556](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L556)

___

### validateLineItemShipping\_

▸ `Protected` **validateLineItemShipping_**(`shippingMethods`, `lineItem`): `boolean`

Checks if a given line item has a shipping method that can fulfill it.
Returns true if all products in the cart can be fulfilled with the current
shipping methods.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shippingMethods` | `ShippingMethod`[] | the set of shipping methods to check from |
| `lineItem` | `LineItem` | the line item |

#### Returns

`boolean`

boolean representing whether shipping method is validated

#### Defined in

[packages/medusa/src/services/cart.ts:525](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/services/cart.ts#L525)

___

### withTransaction

▸ **withTransaction**(`transactionManager?`): [`CartService`](CartService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionManager?` | `EntityManager` |

#### Returns

[`CartService`](CartService.md)

#### Inherited from

TransactionBaseService.withTransaction

#### Defined in

[packages/medusa/src/interfaces/transaction-base-service.ts:13](https://github.com/medusajs/medusa/blob/105c68929/packages/medusa/src/interfaces/transaction-base-service.ts#L13)
