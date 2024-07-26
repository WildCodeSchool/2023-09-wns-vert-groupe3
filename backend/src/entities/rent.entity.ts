import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./user.entity";
import { ProductRented } from "./productRented.entity";
import { RentComplements } from "./rentComplements.entity";

@ObjectType()
@Entity()
export class Rent extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.rents)
  user: User;

  @Field(() => [ProductRented], { nullable: true })
  @OneToMany(() => ProductRented, (productRented) => productRented.rent)
  products: ProductRented[];

  @Field(() => [RentComplements], { nullable: true })
  @OneToMany(() => RentComplements, (rentComplements) => rentComplements.rent)
  complements: RentComplements[];

  @Field()
  @Column()
  from: Date;

  @Field()
  @Column()
  to: Date;

  @Field()
  @Column()
  createdAt: Date;

  @Field()
  @Column()
  updatedAt: Date;

  @Field()
  @Column()
  total: number;

  @Field()
  @Column()
  payment: string;
}