import "reflect-metadata";
import { createClient } from "redis";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import dataSource from "./config/datasource";

import { CategoryResolver, ProductResolver } from "./resolvers";

import { fillDatabaseIfEmpty } from "./fillDatabaseIfEmpty";

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
