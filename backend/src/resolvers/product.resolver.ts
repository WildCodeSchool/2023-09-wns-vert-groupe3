import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { InputCreateProduct, InputUpdateProduct, Product } from "../entities";
import ProductService from "../services/product.service";

@ObjectType()
class deleteProductResponse {
  @Field(() => String, { nullable: true })
  response?: string;
}

@Resolver()
export default class ProductResolver {
  @Query(() => [Product])
  async getAllproducts() {
    return await new ProductService().list();
  }

  @Query(() => Product, { nullable: true })
  async oneProductById(@Arg("id") id: number) {
    const oneProduct = await new ProductService().findById(id);
    console.log(oneProduct);
    return oneProduct;
  }

  @Mutation(() => Product)
  async addProduct(@Arg("infos") infos: InputCreateProduct) {
    const newProduct = await new ProductService().create(infos);
    return newProduct;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg("id") id: number,
    @Arg("infos") data: InputUpdateProduct
  ) {
    const productToUpdate = await new ProductService().update(id, { ...data });
    console.log(productToUpdate);
    return productToUpdate;
  }

  @Mutation(() => deleteProductResponse)
  async deleteProduct(
    @Arg("productId") productId: number
  ): Promise<deleteProductResponse> {
    try {
      await new ProductService().deleteProduct(productId);
      return { response: "Product has been deleted" };
    } catch (error) {
      console.error(error);
      return { response: "Failed to delete product" };
    }
  }
}
