import { MinLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Rent } from "./rent.entity";

@ObjectType()
@Entity()
export class RentComplements extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Rent)
  @ManyToOne(() => Rent, (rent) => rent.complements, { onDelete: 'CASCADE' })
  rent: Rent;

  @Field()
  @Column()
  @MinLength(5, {
    message: "Le nom de l'option doit contenir au moins 5 caractères",
  })
  name: string;

  @Field()
  @Column()
  atPrice: number;

  @Field()
  @Column()
  quantity: number;
}