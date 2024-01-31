import { Article } from "../entities/article";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class ArticleResolver {
   @Query(() => [Article])
   async getAllArticles() {
      return "All articles";
   }
}
