import { Field, InputType } from "type-graphql";

@InputType()
export class InputUpdateProduct {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  picture: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  quantity: number;

  @Field({ nullable: true })
  category: number;
}
