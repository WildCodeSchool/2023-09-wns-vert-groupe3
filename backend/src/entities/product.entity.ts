import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Field, ID, ObjectType } from "type-graphql";
import { IsDate, IsInt, Length, MinLength } from "class-validator";
import { ProductRented } from "./productRented.entity";

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
  stock: number;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.products, {
    cascade: true,
    onDelete: "CASCADE",
  })
  category: Category;

  @Field(() => [ProductRented], { nullable: true })
  @OneToMany(() => ProductRented, (productRented) => productRented.product)
  rents: ProductRented[];

  @Field()
  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;
}
