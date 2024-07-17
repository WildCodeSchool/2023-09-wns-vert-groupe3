import { IsDate, IsInt, Length, MinLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entity";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(5, 50, { message: "Name have to be between 5 and 50 characters" })
  name: string;

  @Field()
  @Column()
  @Length(5, 150, {
    message: "Short description have to be between 5 and 150 characters",
  })
  description_short: string;

  @Field()
  @Column()
  @MinLength(100, {
    message: "Long description have to be above 150 characters",
  })
  description_long: string;

  @Field(() => [String])
  @Column("text", { array: true })
  picture: string[];

  @Field()
  @Column()
  price_fixed: number;

  @Field()
  @Column()
  price_daily: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  discount?: number;

  @Field(() => Number)
  @Column()
  @IsInt()
  quantity: number;

  @Field()
  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;

  // One Product has only 1 Category
  // A Category can contain multiple products
  // ManyToOne Relationship
  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.products, {
    cascade: true,
    onDelete: "CASCADE",
  })
  category: Category;
}
