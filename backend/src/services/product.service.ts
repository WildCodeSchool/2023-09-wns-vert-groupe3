import datasource from "../../config/datasource";
import { InputCreateProduct, Product } from "../entities/product.entity";
import { Repository } from "typeorm";

export default class ProductService {
  db: Repository<Product>;
  constructor() {
    this.db = datasource.getRepository(Product);
  }

  async getAllProducts() {
    return this.db.find();
  }

  async addProduct({ name, description, price, quantity }: InputCreateProduct) {
    const newProduct = this.db.create({ name, description, price, quantity });
    return await this.db.save(newProduct);
  }

}