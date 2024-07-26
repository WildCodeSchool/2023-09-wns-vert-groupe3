import { redisClient } from "../index";
import { validate } from "class-validator";
import { ILike, Repository } from "typeorm";
import datasource from "../config/datasource";
import { Category, Product } from "../entities";
import CategoryService from "../services/category.service";
import { InputCreateProduct, InputUpdateProduct } from "../inputs";

export default class ProductService {
  db: Repository<Product>;
  dbCategory: Repository<Category>;
  constructor() {
    this.db = datasource.getRepository(Product);
    this.dbCategory = datasource.getRepository(Category);
  }

  async list(_ctx: any) {
    try {
      return await this.db.find({
        relations: ["category", "category.products", "rents", "rents.rent"],
      });
    } catch (error) {
      console.error("Error in list query:", error);
      throw error;
    }
  }

  async findById(id: number) {
    return await this.db.findOne({
      where: { id },
      relations: ["category", "category.products", "rents", "rents.rent"],
    });
  }

  async getAllProductsByKeyword(keyword: string): Promise<Product[]> {
    if (keyword.length < 3 || keyword.length > 12) return [];

    const lowerKeyword = keyword.toLowerCase();

    const cacheResult = await redisClient.get(lowerKeyword);
    if (cacheResult !== null) {
      console.log("From cache");
      return JSON.parse(cacheResult);
    } else {
      const dbResult = await Product.find({
        where: { name: ILike(`%${lowerKeyword}%`) },
      });

      redisClient.set(lowerKeyword, JSON.stringify(dbResult), { EX: 60 });

      return dbResult;
    }
  }

  async findProductsByCategoryId(categoryId: number): Promise<Product[]> {
    const products = await this.db.find({
      where: { category: { id: categoryId } },
      relations: ["category"],
    });
    return products;
  }

  async create(data: InputCreateProduct) {
    const categoryToLink = await new CategoryService().find(
      // The unary (+) : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus
      +data.category
    );
    if (!categoryToLink) {
      throw new Error(`Category with ID ${data.category} not found`);
    }

    const newProduct = this.db.create({ ...data, category: categoryToLink });
    return await this.db.save(newProduct);
  }

  async update(id: number, data: InputUpdateProduct): Promise<Product> {
    const categoryToLink = await new CategoryService().find(+data.category);
    if (!categoryToLink) {
      throw new Error(`Category with ID ${data.category} not found`);
    }

    const productToUpdate = await this.findById(id);
    if (!productToUpdate) {
      throw new Error(`Product with ID ${id} not found`);
    }

    const updatedProduct = this.db.merge(productToUpdate, {
      ...data,
      category: categoryToLink,
    });
    const errors = await validate(updatedProduct);
    if (errors.length > 0) {
      console.error("Validation errors:", errors);
      throw new Error("Product data validation failed");
    }

    return await this.db.save(updatedProduct);
  }

  async deleteProduct(id: number) {
    const productToDelete = await this.findById(id);
    if (!productToDelete) {
      throw new Error("Product doesnt exist");
    }
    return await this.db.remove(productToDelete);
  }
}
