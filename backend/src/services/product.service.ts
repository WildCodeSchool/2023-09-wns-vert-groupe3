import { Category, InputCreateProduct, Product } from "../entities";
import datasource from "../../config/datasource";
import { Repository } from "typeorm";

export default class ProductService {
  db: Repository<Product>;
  constructor() {
    this.db = datasource.getRepository(Product);
  }

  async getAllProducts() {
    return this.db.find();
  }

  async addProduct({ name, description, price, quantity, categoryId }: InputCreateProduct) {
    const category = await datasource.getRepository(Category).findOneBy({
        id: categoryId
      });

    // Check if category exist
    if (!category) {
      throw new Error(`Category with ID ${categoryId} not found`);
    }

    const newProduct = this.db.create({ name, description, price, quantity, category });

    return await this.db.save(newProduct);
  }

}