import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsDate, IsInt, Length, Min } from "class-validator";
import { Category } from "./category.entity";

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(5, 50, { message: "Name have to be between 5 and 50 characters"})
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  picture: string;

  @Field(() => Number)
  @Column()
  @IsInt()
  @Min(0, { message: "price have to be positive" })
  price: number;

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
    onDelete: "CASCADE"
  })
  category: Category;

}

// INPUTS
@InputType()
export class InputCreateProduct {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  picture: string;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field()
  category: number; 
}

@InputType()
export class InputUpdateProduct {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true})
  picture: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  quantity: number;

  @Field({ nullable: true })
  category: number;
}
