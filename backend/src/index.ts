import "reflect-metadata";
import { createClient } from "redis";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as jwt from "jsonwebtoken";

import dataSource from "./config/datasource";
import { authChecker } from "./authChecker";
import { fillDatabaseIfEmpty } from "./fillDatabaseIfEmpty";
import {
  CategoryResolver,
  CheckoutResolver,
  ProductResolver,
  UserResolver,
} from "./resolvers";
import RentedResolver from "resolvers/rent.resolver";

require("dotenv").config();

export const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
    resolvers: [
      ProductResolver,
      CategoryResolver,
      UserResolver,
      CheckoutResolver,
      RentedResolver],
    authChecker: ({ context }) => {
      if (context.email) {
        return true;
      } else {
        return false;
      }
    },
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    // A chaque requête exécuté, la fonction de contexte va s'enclencher
    context: async ({ req }) => {
      const token = req.headers.authorization?.split("Bearer ")[1];

      if (token) {
        try {
          const payload = jwt.verify(token, "mysupersecretkey");
          return payload;
        } catch {
          console.log("invalid secret key");
        }
      }
      return {};
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
