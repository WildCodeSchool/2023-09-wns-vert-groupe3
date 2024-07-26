import { Resolver, Query, Mutation, Arg } from "type-graphql";

import { Rent } from "../entities";
import { RentService } from "../services/rent.service";
import { InputCreateRent } from "../inputs/InputCreateRent";

@Resolver()
export default class RentedResolver {
  private rentService = new RentService();

  @Query(() => [Rent])
  async allRents(): Promise<Rent[]> {
    return this.rentService.listAllRents();
  }

  @Query(() => Rent)
  async rentById(@Arg("id") id: number): Promise<Rent | null> {
    return this.rentService.findRentById(id);
  }

  @Query(() => [Rent])
  async rentsByUserId(@Arg("userId") userId: number): Promise<Rent[]> {
    return this.rentService.findRentsByUserId(userId);
  }

  @Query(() => [Rent])
  async rentsByProductId(@Arg("productId") productId: number): Promise<Rent[]> {
    return this.rentService.findRentsByProductId(productId);
  }

  @Query(() => [Rent])
  async rentsByDateRange(
    @Arg("from") from: Date,
    @Arg("to") to: Date
  ): Promise<Rent[]> {
    return this.rentService.findRentsByDateRange(from, to);
  }

  @Mutation(() => Rent)
  async createRent(
    @Arg("data") data: InputCreateRent
  ): Promise<Rent> {
    return this.rentService.createRent(data);
  }
}
