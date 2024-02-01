import { Field, ID, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsInt, Min } from "class-validator";
import { Category } from "./category.entity";

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Number)
  @Column()
  @IsInt()
  @Min(0)
  price: number;

  @Field(() => Number)
  @Column()
  @IsInt()
  quantity: number;

  @Field()
  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  // One Product has only 1 Category
  // A Category can contain multiple products
  // ManyToOne Relationship
  @Field(() => Category, { nullable: false})
  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "SET NULL"
  })
  category: Category;

}
