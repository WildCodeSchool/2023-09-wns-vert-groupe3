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

  async deleteProduct(productId: number): Promise<boolean> {
    try {
        const productToDelete = await this.db.findOne({ where: { id: productId } });

        if (!productToDelete) {
            throw new Error(`Product with ID ${productId} not found`);
        }

        await this.db.remove(productToDelete);

        return true;
    } catch (error) {
        console.error("Error deleting product:", error);
        return false;
    }
  }
  
}