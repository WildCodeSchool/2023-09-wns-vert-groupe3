import { Field, InputType } from "type-graphql";

@InputType()
export class InputUserCreate {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
