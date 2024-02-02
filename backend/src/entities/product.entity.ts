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
  name: string;

  @Field()
  @Column()
  @Length(3, 20)
  description: string;

  @Field()
  @Column()
  picture: string;

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

  @Field()
  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;

  // One Product has only 1 Category
  // A Category can contain multiple products
  // ManyToOne Relationship
  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "SET NULL"
  })
  category: Category;

}

@InputType()
export class InputCreateProduct {
  @Field()
  name: string;

  @Field()
  @Length(3, 20)
  description: string;

  @Field()
  picture: string;

  @Field()
  @IsInt()
  @Min(0)
  price: number;

  @Field()
  @IsInt()
  @Min(0)
  quantity: number;

  @Field()
  categoryId: number; 
}

@InputType()
export class InputUpdateProduct {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Length(3, 20)
  description?: string;
  
  @Field({ nullable: true})
  picture?: string;

  @Field({ nullable: true })
  @IsInt()
  @Min(0)
  price?: number;

  @Field({ nullable: true })
  @IsInt()
  @Min(0)
  quantity?: number;

  @Field({ nullable: true })
  categoryId?: number;
}
