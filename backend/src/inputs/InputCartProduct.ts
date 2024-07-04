// backend/src/inputs/inputcartproducts.ts

import { Field, InputType, Int } from "type-graphql";

@InputType()
export class InputCartProduct {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  /* @Field()
  picture: string; */

  @Field()
  price: number;

  @Field()
  quantity: number;
}
