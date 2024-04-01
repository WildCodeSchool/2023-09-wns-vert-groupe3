import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dataSource from "./config/datasource";
import { CategoryResolver, ProductResolver } from "./resolvers";
import { Category, Product } from "../src/entities";

const start = async () => {
   await dataSource.initialize();

   // creating products
   const categories = await Category.find();
   if (categories.length === 0) {
      await Category.save([
         { name: "Skiing" },
         { name: "Hiking" },
         { name: "Camping" },
         { name: "Fishing" },
         { name: "Climbing" },
         { name: "Rafting" },
      ]);
   }

   // if no products, create some
   const products = await Product.find();
   if (products.length === 0) {

      const categories = await Category.find();

      const snowboard = new Product()
      snowboard.category = categories[0];
      snowboard.name = "Snowboard";
      snowboard.description = "This snowboard is for rent";
      snowboard.picture =
         "https://www.burton.com/blogs/media/images/goofy-vs-regular-guide-stance-options_CXYu2zj.width-990.jpg";
      snowboard.price = 309;
      snowboard.quantity = 5;
      await snowboard.save();

      const tent = new Product()
      tent.category = categories[2];
      tent.name = "Tent";
      tent.description = "This tent is for rent";
      tent.picture =
         "https://m.media-amazon.com/images/I/71r6GIY+vaL._AC_SL1500_.jpg";
      tent.price = 89;
      tent.quantity = 8;
      await tent.save();

      const climbing = new Product()
      climbing.category = categories[4];
      climbing.name = "Material Climbing";
      climbing.description = "This material climbing is for rent";
      climbing.picture =
         "https://blog.snowleader.com/wp-content/uploads/2020/12/visuel-ambiance-escalade-homme.jpg";
      climbing.price = 149;
      climbing.quantity = 3;
      await climbing.save();

      const backpack = new Product()
      backpack.category = categories[1];
      backpack.name = "Backpack";
      backpack.description = "This backpack is for rent";
      backpack.picture =
         "backpack.jpg";
      backpack.price = 59;
      backpack.quantity =11;
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
