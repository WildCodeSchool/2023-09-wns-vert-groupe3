import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Like } from "typeorm";
import { redisClient } from "../../src/index";
import { Product } from "../entities";
import { InputCreateProduct, InputUpdateProduct } from "../inputs";
import ProductService from "../services/product.service";

@Resolver()
export default class ProductResolver {
  @Query(() => [Product])
  async getAllproducts() {
    return await new ProductService().list();
  }

  @Query(() => [Product])
  async getAllProductsByKeyword(@Arg("keyword") keyword: string) {
    const cacheResult = await redisClient.get(keyword);
    if (cacheResult !== null) {
      console.log("From cache");
      return JSON.parse(cacheResult);
    } else {
      const dbResult = await Product.find({
        where: { description: Like(`%${keyword}%`) },
      });
      redisClient.set(keyword, JSON.stringify(dbResult), { EX: 60 });
      return dbResult;
    }
  }

  @Query(() => Product, { nullable: true })
  async getProductById(@Arg("productId") id: number) {
    return await new ProductService().findById(id);
  }

  @Query(() => [Product])
  async getProductsByCategoryId(@Arg("categoryId") categoryId: number) {
    const productsByCategoryId =
      await new ProductService().findProductsByCategoryId(categoryId);
    return productsByCategoryId;
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
