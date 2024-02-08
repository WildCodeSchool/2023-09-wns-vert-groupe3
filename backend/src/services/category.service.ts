import { Category, InputCreateCategory } from "../entities";
import datasource from "../../config/datasource";
import { Repository } from "typeorm";

export default class CategoryService {
  db: Repository<Category>;
  constructor() {
    this.db = datasource.getRepository(Category);
  }

//   async getAllCategories() {
//     return this.db.find({
//       relations: {
//         products: true,
//       }
//     });
//   }

  async addCategory({ name }: InputCreateCategory) {
    const newCategory = this.db.create({ name });
    return await this.db.save(newCategory);
  }

//   async find(id: number) {
//     return await this.db.findOne({
//       where: {
//         id
//       },
//       relations: {
//         products: true
//       }
//     });
//   }

}