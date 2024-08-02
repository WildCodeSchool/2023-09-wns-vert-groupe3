import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Product } from "../entities";
import { InputCreateProduct, InputUpdateProduct } from "../inputs";
import ProductService from "../services/product.service";

@Resolver()
export default class ProductResolver {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  @Query(() => [Product])
  async getAllproducts(@Ctx() ctx: {email:string}) {
    return await this.productService.list(ctx);
  }

  @Query(() => [Product])
  async getAllProductsByKeyword(@Arg("keyword") keyword: string) {
    return await this.productService.getAllProductsByKeyword(keyword);
  }

  @Query(() => Product, { nullable: true })
  async getProductById(@Arg("productId") id: number) {
    return await this.productService.findById(id);
  }

  @Query(() => [Product])
  async getProductsByCategoryId(@Arg("categoryId") categoryId: number) {
    const productsByCategoryId =
      await this.productService.findProductsByCategoryId(categoryId);
    return productsByCategoryId;
  }

  @Authorized("admin")
   @Mutation(() => Product)
   async addProduct(
      @Arg("infos") infos: InputCreateProduct,
      // @Ctx() ctx: { email: string }
   ) {
      const newProduct = await this.productService.create(infos);
      return newProduct;
   }

  @Authorized("admin")
  @Mutation(() => Product)
  async updateProduct(
    @Arg("id") id: number,
    @Arg("infos") data: InputUpdateProduct
  ) {
    const updatedProduct = await this.productService.update(id, data);
    return updatedProduct;
  }

  @Authorized("admin")
  @Mutation(() => Boolean)
  async deleteProduct(@Arg("productId") productId: number): Promise<boolean> {
    try {
      await this.productService.deleteProduct(productId);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
