import { Repository } from "typeorm";
import datasource from "../../config/datasource";
import { Category, InputCreateCategory } from "../entities";

export default class CategoryService {
  db: Repository<Category>;
  constructor() {
    this.db = datasource.getRepository(Category);
  }

  async getAllCategories() {
    return this.db.find({
      relations: {
        products: true,
      },
    });
  }

  async addCategory({ name }: InputCreateCategory) {
    const newCategory = this.db.create({ name });
    return await this.db.save(newCategory);
  }

  async find(id: number) {
    return await this.db.findOne({
      where: {
        id: id,
      },
      relations: {
        products: true,
      },
    });
  }

  async deleteCategory(id: number) {
    const categoryToDelete = await this.find(id);

    if (!categoryToDelete) {
      throw new Error(`Category with id ${id} not found`);
    }

    await this.db.remove(categoryToDelete);
  }
}
