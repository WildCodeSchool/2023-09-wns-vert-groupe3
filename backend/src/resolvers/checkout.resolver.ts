import { Arg, Mutation, Resolver } from "type-graphql";
import { stripe } from "../index";
import { InputCartProduct } from "../inputs";
require("dotenv").config();

@Resolver()
export default class CheckoutResolver {
  @Mutation(() => String)
  async createCheckoutSession(
    @Arg("products", () => [InputCartProduct]) products: InputCartProduct[]
  ) {
    const successUrl =
      process.env.NODE_ENV === "production"
        ? `${process.env.URL_PROD_DEV}/stripe/success`
        : `${process.env.NEXT_PUBLIC_FRONTEND_URL}/stripe/success`;

    const cancelUrl =
      process.env.NODE_ENV === "production"
        ? `${process.env.URL_PROD_DEV}/cart`
        : `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cart`;

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
      success_url: successUrl,
      /* success_url:
        "http://localhost:3000/stripe/success?session_id={CHECKOUT_SESSION_ID}", */
      cancel_url: cancelUrl,
    });
    return session.url;
  }
}
