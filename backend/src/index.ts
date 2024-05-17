import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Category, Product } from "../src/entities";
import dataSource from "./config/datasource";
import { CategoryResolver, ProductResolver } from "./resolvers";

import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://redis",
});

redisClient.on("error", (err) => {
  console.log("Redis CLient Error", err);
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});

const start = async () => {
  await redisClient.connect();
  await dataSource.initialize();

  // if no categories, create some categories
  const categories = await Category.find();
  if (categories.length === 0) {
    await Category.save([
      { name: "Ski" },
      { name: "Randonnée" },
      { name: "Camping" },
      { name: "Pêche" },
      { name: "Escalade" },
      { name: "Rafting" },
    ]);
  }

  // if no products, create some products
  const products = await Product.find();
  if (products.length === 0) {
    const categories = await Category.find();

    const snowboard = new Product();
    snowboard.category = categories[0];
    snowboard.name = "Snowboard";
    snowboard.description = "Ceci est une description d'un snowboard à louer !";
    snowboard.picture =
      "https://www.burton.com/blogs/media/images/goofy-vs-regular-guide-stance-options_CXYu2zj.width-990.jpg";
    snowboard.price = 309;
    snowboard.quantity = 5;
    await snowboard.save();

    const tent = new Product();
    tent.category = categories[2];
    tent.name = "Tente";
    tent.description = "Ceci est une description d'une tente à louer !";
    tent.picture =
      "https://m.media-amazon.com/images/I/71r6GIY+vaL._AC_SL1500_.jpg";
    tent.price = 89;
    tent.quantity = 8;
    await tent.save();

    const climbing = new Product();
    climbing.category = categories[4];
    climbing.name = "Materiel d'escalade";
    climbing.description =
      "Ceci est une description de matériel d'escalade à louer !";
    climbing.picture =
      "https://blog.snowleader.com/wp-content/uploads/2020/12/visuel-ambiance-escalade-homme.jpg";
    climbing.price = 149;
    climbing.quantity = 3;
    await climbing.save();

    const backpack = new Product();
    backpack.category = categories[1];
    backpack.name = "Sac de voyage";
    backpack.description =
      "Ceci est une description d'un sac de voyage à louer !";
    backpack.picture =
      "https://img.freepik.com/vecteurs-premium/vecteur-icone-image-par-defaut-page-image-manquante-pour-conception-site-web-application-mobile-aucune-photo-disponible_87543-11093.jpg";
    backpack.price = 59;
    backpack.quantity = 11;
    await backpack.save();
  }

  const schema = await buildSchema({
    resolvers: [ProductResolver, CategoryResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
