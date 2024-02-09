import { Category, InputCreateCategory } from "../entities";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import CategoryService from "../services/category.service";

@Resolver()
export default class CategoryResolver {
  @Query(() => [Category])
  async categories() {
    return await Category.find()
  }



//   @Query(() => [Category])
//   async categories() {
//     return await new CategoryService().getAllCategories();
//   }




  @Mutation(() => Category)
  async addCategory(@Arg("infos") infos: InputCreateCategory) {
    const newCategory = await new CategoryService().addCategory(infos);
    return newCategory;
  }
}