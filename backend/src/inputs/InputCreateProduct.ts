import { Field, InputType } from "type-graphql";

// INPUTS
@InputType()
export class InputCreateProduct {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  picture: string;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field()
  category: number;
}