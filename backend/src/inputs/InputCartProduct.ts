import { Field, InputType, Int } from "type-graphql";

@InputType()
export class InputCartProduct {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [String])
  picture: string[];

  @Field()
  price: number;

  @Field()
  quantity: number;
}
