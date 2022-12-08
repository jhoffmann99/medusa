import StripeBase from "../helpers/stripe-base"

class GiropayProviderService extends StripeBase {
  static identifier = "stripe-giropay"

  constructor({ stripeProviderService, manager }, options) {
    super({ stripeProviderService, manager }, options)
  }

  get paymentIntentOptions() {
    return {
      payment_method_types: ["giropay"],
      capture_method: "automatic",
    }
  }
}

export default GiropayProviderService
