import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities";
import { InputCreateCategory } from "../inputs";
import CategoryService from "../services/category.service";

@Resolver()
export default class CategoryResolver {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  @Query(() => [Category])
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Mutation(() => Category)
  async addCategory(@Arg("infos") infos: InputCreateCategory) {
    return await this.categoryService.addCategory(infos);
  }

  @Mutation(() => String)
  async deleteCategoryById(@Arg("id") id: number) {
    try {
      await this.categoryService.deleteCategory(id);
      return "The Category has been deleted";
    } catch (error) {
      console.error("Error deleting category:", error);
      throw new Error("Failed to delete category.");
    }
  }
}
