import { Field, InputType } from "type-graphql";

@InputType()
export class InputUserLogin {
  @Field()
  email: string;

  @Field()
  password: string;
}
