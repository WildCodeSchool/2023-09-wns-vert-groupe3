import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category, InputCreateCategory } from "../entities";
import CategoryService from "../services/category.service";

@Resolver()
export default class CategoryResolver {
  @Query(() => [Category])
  async getAllCategories() {
    return await new CategoryService().getAllCategories();
  }

  @Mutation(() => Category)
  async addCategory(@Arg("infos") infos: InputCreateCategory) {
    const newCategory = await new CategoryService().addCategory(infos);
    return newCategory;
  }

  @Mutation(() => String)
  async deleteCategoryById(@Arg("id") id: number) {
    const categoryService = new CategoryService();

    try {
      await categoryService.deleteCategory(id);
      return "The Category has been deleted";
    } catch (error) {
      console.error("Error deleting category:", error);
      throw new Error("Failed to delete category.");
    }
  }
}
