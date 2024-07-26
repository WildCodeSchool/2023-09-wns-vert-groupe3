import { Rent } from "./rent.entity";
import { Product } from "./product.entity";
import { IsNotEmpty } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class ProductRented extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // RENT RELATION
  @Field(() => Rent)
  @ManyToOne(() => Rent, (rent) => rent.products, { onDelete: 'CASCADE' })
  rent: Rent;

  // PRODUCT RELATION
  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.rents, { nullable: false, onDelete: 'CASCADE' })
  product: Product;

  @Field()
  @Column()
  @IsNotEmpty({ message: "La quantité d'achat doit être définie" })
  quantity: number;

  @Field()
  @Column()
  @IsNotEmpty({ message: "Le prix fixé lors de l'achat doit être défini" })
  atFixedPrice: number;

  @Field()
  @Column()
  @IsNotEmpty({ message: "Le prix journalier lors de l'achat doit être défini" })
  atDailyPrice: number;
}