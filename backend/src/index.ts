import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import dataSource from "./config/datasource";

import { CategoryResolver, ProductResolver } from "./resolvers";

import { fillDatabaseIfEmpty } from "./fillDatabaseIfEmpty";


const start = async () => {
   await dataSource.initialize();
   
   await fillDatabaseIfEmpty();

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

