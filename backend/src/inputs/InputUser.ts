import { Field, InputType } from "type-graphql";

@InputType({ description: "New recipe data" })
export class InputUser {
  @Field()
  email: string;

  @Field()
  password: string;
}
