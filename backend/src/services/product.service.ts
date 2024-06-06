import { validate } from "class-validator";
import { redisClient } from "index";
import { Like, Repository } from "typeorm";
import datasource from "../config/datasource";
import { Category, Product } from "../entities";
import { InputCreateProduct, InputUpdateProduct } from "../inputs";
import CategoryService from "../services/category.service";

export default class ProductService {
  db: Repository<Product>;
  dbCategory: Repository<Category>;
  constructor() {
    this.db = datasource.getRepository(Product);
    this.dbCategory = datasource.getRepository(Category);
  }

  async list() {
    return this.db.find({
      relations: {
        category: true,
      },
    });
  }

  async findById(id: number) {
    return await this.db.findOne({
      where: { id },
      relations: { category: true },
    });
  }

  async getAllProductsByKeyword(keyword: string): Promise<Product[]> {
    const cacheResult = await redisClient.get(keyword);
    if (cacheResult !== null) {
      console.log("From cache");
      return JSON.parse(cacheResult);
    } else {
      const dbResult = await Product.find({
        where: { name: Like(`%${keyword}%`) },
      });
      redisClient.set(keyword, JSON.stringify(dbResult), { EX: 60 });
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

  async update(id: number, data: InputUpdateProduct) {
    const categoryToLink = await new CategoryService().find(data.category);
    if (!categoryToLink) {
      throw new Error("category doesnt exist");
    }
    const productToUpdate = await this.findById(id);
    if (!productToUpdate) {
      throw new Error("Product doesnt exist");
    }
    const producToSave = this.db.merge(productToUpdate, {
      ...data,
      category: categoryToLink,
    });
    const errors = await validate(producToSave);
    if (errors.length !== 0) {
      console.log(errors);
      throw new Error("Error when validate");
    }
    return await this.db.save(producToSave);
  }

  async deleteProduct(id: number) {
    const productToDelete = await this.findById(id);
    if (!productToDelete) {
      throw new Error("Product doesnt exist");
    }
    return await this.db.remove(productToDelete);
  }
}
