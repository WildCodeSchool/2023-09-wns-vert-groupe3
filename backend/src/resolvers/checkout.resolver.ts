import { Arg, Mutation, Resolver } from "type-graphql";
import { stripe } from "../index";
import { InputCartProduct } from "../inputs";

@Resolver()
export default class CheckoutResolver {
  @Mutation(() => String)
  async createCheckoutSession(
    @Arg("products", () => [InputCartProduct]) products: InputCartProduct[]
  ) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((product) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            images: product.picture,
          },
          unit_amount: product.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 6,
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/stripe/success",
      /* success_url:
        "http://localhost:3000/stripe/success?session_id={CHECKOUT_SESSION_ID}", */
      cancel_url: "http://localhost:3000/cart",
    });
    return session.url;
  }
}
