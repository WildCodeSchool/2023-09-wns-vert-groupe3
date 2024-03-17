import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dataSource from "./config/datasource";
import { CategoryResolver, ProductResolver } from "./resolvers";
import { Category, Product } from "../src/entities";

const start = async () => {
  await dataSource.initialize();

    // if no products, create some
    const products = await Product.find();
    if (products.length === 0) {
      // creating products
      const categories = await Category.find();

      const snowboard = new Product
      snowboard.name = "I'm selling my snowboard";
      snowboard.description = "This snowboard is to sell";
      snowboard.picture =
      "https://m.media-amazon.com/images/I/71r6GIY+vaL._AC_SL1500_.jpg";
      snowboard.price = 300;
      snowboard.category = categories[0];
      snowboard.save();
  
      const backpack = new Product
      backpack.name = "I'm selling my backpack";
      backpack.description = "This backpack is to sell";
      backpack.picture =
      "https://www.burton.com/blogs/media/images/goofy-vs-regular-guide-stance-options_CXYu2zj.width-990.jpg";
      backpack.price = 300;
      backpack.category = categories[0];
      backpack.save();
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
