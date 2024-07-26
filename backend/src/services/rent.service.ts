import { Between, In, LessThan, MoreThan, Repository } from "typeorm";

import {
  Product,
  User,
  Rent,
  RentComplements,
  ProductRented,
} from "../entities";
import { InputCreateRent } from "../inputs";
import dataSource from "../config/datasource";

export class RentService {
  dbUser: Repository<User>;
  dbRent: Repository<Rent>;
  dbProduct: Repository<Product>;
  dbProductRented: Repository<ProductRented>;
  dbRentComplements: Repository<RentComplements>;

  constructor() {
    this.dbUser = dataSource.getRepository(User);
    this.dbRent = dataSource.getRepository(Rent);
    this.dbProduct = dataSource.getRepository(Product);
    this.dbProductRented = dataSource.getRepository(ProductRented);
    this.dbRentComplements = dataSource.getRepository(RentComplements);
  }

  async listAllRents() {
    return await this.dbRent.find({
      relations: ["user", "products", "products.product", "complements"],
    });
  }

  async findRentById(id: number) {
    return await this.dbRent.findOne({
      where: { id },
      relations: ["user", "products", "products.product", "complements"],
    });
  }

  async findRentsByUserId(userId: number) {
    return await this.dbRent.find({
      where: { user: { id: userId } },
      relations: ["user", "products", "products.product", "complements"],
    });
  }

  async findRentsByProductId(productId: number) {
    return await this.dbRent.find({
      where: { products: { id: productId } },
      relations: ["user", "products", "products.product", "complements"],
    });
  }

  async findRentsByDateRange(from: Date, to: Date) {
    return await this.dbRent.find({
      where: [
        { from: Between(from, to) },
        { to: Between(from, to) },
        { from: LessThan(from), to: MoreThan(to) },
        { from: MoreThan(from), to: LessThan(to) },
      ],
      relations: ["user", "products", "products.product", "complements"],
    });
  }

  async createRent(data: InputCreateRent): Promise<Rent> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Validate data, check if same id is present in the products array
      const uniqueProducts = new Set(data.products.map((product) => product.id));
      if (uniqueProducts.size !== data.products.length) {
        throw new Error(`Duplicate product IDs found in the products array. Same product ID cannot be used more than once use quantity instead.`);
      }

      // Step 1: Find the user
      const user = await this.dbUser.findOne({ where: { id: data.userId } });
      if (!user) {
        throw new Error("User not found, please check the user id");
      }

      // Step 2: Find the products
      const products = await this.dbProduct.find({
        where: { id: In(data.products.map((product) => product.id)) },
      });
      if (products.length !== data.products.length) {
        throw new Error(
          "Some products were not found, please check the product ids"
        );
      }

      // Step 3: Check product rent availability
      const productRentedItems = await this.dbProductRented.find({
        where: {
          product: In(data.products.map((product) => product.id)),
          rent: [
            { from: Between(data.from, data.to) },
            { to: Between(data.from, data.to) },
            { from: LessThan(data.from), to: MoreThan(data.to) },
            { from: MoreThan(data.from), to: LessThan(data.to) },
          ],
        },
        relations: ["product", "rent", "rent.products"],
      });

      productRentedItems.forEach((item) => {
        if (!item.rent || !item.rent.products) {
          throw new Error(
            `Rent record with id ${item.rent?.id} is missing product details`
          );
        }

        // Retrieve requested quantity
        const productRequestedQuantity = data.products.find(
          (product) => product.id === item.product.id
        )?.quantity;
        if (!productRequestedQuantity) {
          throw new Error(
            `Requested quantity for product ${item.product.name} (ID: ${item.product.id}) is missing`
          );
        }

        // Get the product stock
        const productStock = item.product.stock;
        // Calculate total rented products
        const actualRentedProducts = productRentedItems.reduce(
          (acc, curr) => acc + curr.quantity,
          0
        );
        // Add the current item quantity to the total rented products
        const totalRentedProducts = actualRentedProducts + productRequestedQuantity;

        console.log("quantity", productRequestedQuantity);

        if (productStock < totalRentedProducts) {
          throw new Error(
            `Product ${item.product.name} (ID: ${item.product.id}) is not available for rent in the selected date range. Total stock: ${actualRentedProducts}/${productStock}. Requested quantity: ${productRequestedQuantity}. Please check the availability and try again.`
          );
        }
      });

      // Step 4: Create rent
      const newRent = this.dbRent.create({
        user,

        // Forcing the time to 00:00:00 to avoid timezone issues
        //! This is not the best approach, but it's a quick fix for the timezone issue
        //! This solution is also implemented in the frontend in the 'utils/date.ts' file
        //? For a long-term solution, you should consider using a library like `date-fns` or `moment.js`
        from: new Date(data.from.setHours(0, 0, 0, 0)),
        to: new Date(data.to.setHours(0, 0, 0, 0)),

        createdAt: new Date(),
        updatedAt: new Date(),
        total: 150,
        payment: "credit card",
      });

      // Step 5: Save the rent first to get the generated ID
      const savedRent = await queryRunner.manager.save(newRent);

      // Step 6: Create rent products with the saved rent
      const rentProducts = data.products.map((product) => {
        return this.dbProductRented.create({
          rent: savedRent,
          product: { id: product.id } as Product,
          quantity: product.quantity,
          atFixedPrice: product.atFixedPrice,
          atDailyPrice: product.atDailyPrice,
        });
      });

      // Step 7: Create rent complements with the saved rent
      const rentComplements = data.complements.map((complement) => {
        return this.dbRentComplements.create({
          rent: savedRent,
          name: complement.name,
          quantity: complement.quantity,
          atPrice: complement.atPrice,
        });
      });

      // Step 8: Save rent products and rent complements
      await queryRunner.manager.save(rentProducts);
      await queryRunner.manager.save(rentComplements);

      // Commit the transaction
      await queryRunner.commitTransaction();

      return savedRent;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error("Error while creating rent:", error);
      throw new Error(`Error while creating rent: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }
}
