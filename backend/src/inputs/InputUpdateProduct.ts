import { Field, InputType } from "type-graphql";

@InputType()
export class InputUpdateProduct {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  description_short: string;

  @Field(() => String, { nullable: true })
  description_long: string;

  @Field(() => String, { nullable: true })
  picture: string;

  @Field(() => Number, { nullable: true })
  price_fixed: number;

  @Field(() => Number, { nullable: true })
  price_daily: number;

  @Field(() => Number, { nullable: true })
  discount?: number;

  @Field(() => Number, { nullable: true })
  quantity: number;

  @Field(() => Number, { nullable: true })
  category: number;
}
