import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { createClient } from "redis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { authChecker } from "./authChecker";
import dataSource from "./config/datasource";
import { fillDatabaseIfEmpty } from "./fillDatabaseIfEmpty";
import { CategoryResolver, ProductResolver, UserResolver } from "./resolvers";

export const redisClient = createClient({
  url: "redis://redis",
});

redisClient.on("error", (err: Error) => {
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
    resolvers: [ProductResolver, CategoryResolver, UserResolver],
    authChecker: authChecker,
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
