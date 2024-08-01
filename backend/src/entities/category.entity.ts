import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { IsNotEmpty } from "class-validator";


@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @IsNotEmpty({ message: "Le nom de la catégorie est obligatoire" })
  name: string;

  // A category can contain multiple ads
  @OneToMany(() => Product, (products) => products.category)
//   @Field(() => [Product], { nullable: true })
  products: Product[];
}