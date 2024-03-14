import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Category, InputCreateCategory } from "../entities";
import CategoryService from "../services/category.service";

@ObjectType()
class DeleteCategoryResponse {
  @Field(() => String, { nullable: true })
  response?: string;
}

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

  @Mutation(() => DeleteCategoryResponse)
  async deleteCategoryById(
    @Arg("id") id: number
  ): Promise<DeleteCategoryResponse> {
    const categoryService = new CategoryService();

    try {
      await categoryService.deleteCategory(id);
      return { response: "Category has been deleted" };
    } catch (error) {
      return { response: "Error deleting category" };
    }
  }
}
