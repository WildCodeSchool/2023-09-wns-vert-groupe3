import { Field, InputType } from "type-graphql";

// INPUTS
@InputType()
export class InputCreateProduct {
   @Field()
   name: string;

   @Field()
   description: string;

   @Field({ nullable: true, defaultValue: "https://img.freepik.com/vecteurs-premium/vecteur-icone-image-par-defaut-page-image-manquante-pour-conception-site-web-application-mobile-aucune-photo-disponible_87543-11093.jpg" })
   picture?: string;

   @Field()
   price: number;

   @Field()
   quantity: number;

   @Field()
   category: number;
}