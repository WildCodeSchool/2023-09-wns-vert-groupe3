import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type UserRoleType = "admin" | "user";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user"
  })
  role: UserRoleType;

}