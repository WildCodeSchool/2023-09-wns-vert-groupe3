import { Field, InputType } from "type-graphql";

@InputType()
export class InputCreateProduct {
  @Field(() => String)
  name: string;

  @Field()
  description_short: string;

  @Field()
  description_long: string;

  @Field()
  picture: string;

  @Field()
  price_fixed: number;

  @Field()
  price_daily: number;

  @Field(() => Number, { nullable: true })
  discount?: number;

  @Field(() => Number)
  quantity: number;

  @Field(() => Number)
  category: number;
}