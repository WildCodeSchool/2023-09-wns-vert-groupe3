import { InputCreateProduct, Product } from "../entities";
import ProductService from "../services/product.service";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export default class ProductResolver {
  @Query(() => [Product])
  async products() {
    return await new ProductService().getAllProducts();
  }

  @Mutation(() => Product)
  async addProduct(@Arg("infos") infos: InputCreateProduct) {
    const newProduct = await new ProductService().addProduct(infos);
    return newProduct;
  }
  
  @Mutation(() => Boolean)
  async deleteProduct(@Arg("productId") productId: number): Promise<boolean> {
    try {
      await new ProductService().deleteProduct(productId);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

}
