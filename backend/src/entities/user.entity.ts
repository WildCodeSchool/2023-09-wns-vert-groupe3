import { MinLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type UserRoleType = "admin" | "user";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @MinLength(5, {
    message: "Le nom d'utilisateur doit contenir au moins 5 caractères",
  })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;

  @Field()
  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user",
  })
  role: UserRoleType;
}

@ObjectType()
export class UserInfo {
  @Field()
  isLoggedIn: boolean;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  role: string;
}
