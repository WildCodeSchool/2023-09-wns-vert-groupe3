import { Field, InputType } from "type-graphql";

@InputType()
export class InputCreateCategory {
  @Field()
  name: string;
}