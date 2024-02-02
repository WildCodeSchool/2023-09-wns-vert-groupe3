import { Category, InputCreateProduct, InputUpdateProduct, Product } from "../entities";
import datasource from "../../config/datasource";
import { Repository } from "typeorm";

export default class ProductService {
  db: Repository<Product>;
  constructor() {
    this.db = datasource.getRepository(Product);
  }

  async getAllProducts() {
    return this.db.find({
      relations: {
        category: true,
      }
    });
  }

  async addProduct({ name, description, picture, price, quantity, categoryId }: InputCreateProduct) {
    const category = await datasource.getRepository(Category).findOneBy({
        id: categoryId
      });

    // Check if category exist
    if (!category) {
      throw new Error(`Category with ID ${categoryId} not found`);
    }

    const newProduct = this.db.create({ name, description, picture, price, quantity, category });

    return await this.db.save(newProduct);
  }

  async updateProduct(id: number, { name, description, picture, price, quantity, categoryId }: InputUpdateProduct) {
    try {
      const category = await datasource.getRepository(Category).findOneByOrFail({
          id: categoryId
      });
  
      // Check if category exist
      if (!category) {
        throw new Error(`Category with ID ${categoryId} not found`);
      }
      const productToUpdate = await this.db.save({ id, name, description, picture, price, quantity, category });
      // console.log(productToUpdate);
      return productToUpdate;
      
    } catch (error) {
      console.error("Error while updating product :", error);
      return false;
    }
  }

  async deleteProduct(productId: number): Promise<boolean> {
    try {
        const productToDelete = await this.db.findOne({ where: { id: productId } });

        // Check if the productToDelete id exist
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