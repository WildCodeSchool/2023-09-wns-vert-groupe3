import { Field, InputType, Int } from "type-graphql";

@InputType()
export class InputProductRented {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Number)
  atFixedPrice: number;

  @Field(() => Number)
  atDailyPrice: number;
}

@InputType()
export class InputRentComplements {
  @Field()
  name: string;

  @Field()
  atPrice: number;

  @Field()
  quantity: number;
}

@InputType()
export class InputCreateRent {
  @Field(() => Number)
  userId: number;

  @Field(() => [InputProductRented])
  products: InputProductRented[];

  @Field(() => [InputRentComplements])
  complements: InputRentComplements[];

  @Field()
  from: Date;

  @Field()
  to: Date;
}