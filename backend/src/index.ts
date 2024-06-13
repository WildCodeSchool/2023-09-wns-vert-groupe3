import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { createClient } from "redis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
// import { authChecker } from "./authChecker";
import dataSource from "./config/datasource";
import { fillDatabaseIfEmpty } from "./fillDatabaseIfEmpty";
import { CategoryResolver, ProductResolver, UserResolver } from "./resolvers";
import * as jwt from "jsonwebtoken";

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
   //  authChecker: ({context}) => {
   //    if (context.email) {
   //       return true
   //    } else {
   //       return false
   //    }
   //  },
  });

   const server = new ApolloServer({
      schema,
   });
   const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      // A chaque requête exécuté, la fonction de contexte va s'enclencher
      context: async ({ req }) => {
         // console.log("headers in he context :", req.headers.authorization);

         // Récupération du token à partir du header de la requete.
         const token = req.headers.authorization?.split("Bearer ")[1];
         console.log("generated token :", token);

         // Vérification du token avec la clé secrète en allant le lire. Vérifie la cohérence avec la clé secrète défini dans la query loginUser lors de la signature.
         if (token) {
            try {
               const payload = jwt.verify(token, "mysupersecretkey");
               console.log("payload", payload);
               return payload;
            } catch {
               console.log("invalid secret key")
            }
         }
         return {};
      },
   });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
