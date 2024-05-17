import { Field, InputType } from "type-graphql";

@InputType()
export class InputCreateProduct {
  @Field(() => String)
  name: string;

  @Field()
  description_short: string;

  @Field()
  description_long: string;

  @Field({
    nullable: true,
    defaultValue:
      "https://img.freepik.com/vecteurs-premium/vecteur-icone-image-par-defaut-page-image-manquante-pour-conception-site-web-application-mobile-aucune-photo-disponible_87543-11093.jpg",
  })
  picture?: string;

  @Field()
  price_fixed: number;

  @Field()
  price_daily: number;

  @Field(() => Number, { nullable: true })
  discount?: number;

  @Field(() => Number)
  quantity: number;

  @Field(() => Number)
  category: number;
}
