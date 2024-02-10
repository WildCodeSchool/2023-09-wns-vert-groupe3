import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";


@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  // A category can contain multiple ads
  @OneToMany(() => Product, (products) => products.category)
//   @Field(() => [Product], { nullable: true })
  products: Product[];
}

@InputType()
export class InputCreateCategory {
  @Field()
  name: string;
}