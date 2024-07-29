import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserInfo } from "../entities/user.entity";
import { InputUserCreate, InputUserLogin } from "../inputs";
import { UserService } from "../services/user.service";

@Resolver()
export default class UserResolver {
  private userService = new UserService();

  @Authorized("admin")
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Authorized("admin")
  @Mutation(() => String)
  async deleteUser(@Arg("userId") userId: string): Promise<string> {
    return this.userService.deleteUser(userId);
  }

  //   @Mutation(() => User)
  //   async createUser(@Arg("inputUser") inputUser: InputUserCreate): Promise<User> {
  //     return this.userService.createUser(inputUser);
  //   }

  @Mutation(() => String)
  async register(
    @Arg("newUserData") newUserData: InputUserCreate
  ): Promise<string> {
    try {
      await this.userService.createUser(newUserData);
      return "New user has been created with success";
    } catch (err) {
      console.log("err", err);
      return "Error while creating new user";
    }
  }

  @Query(() => String)
  async loginUser(
    @Arg("inputUserLogin") inputUserLogin: InputUserLogin
  ): Promise<string> {
    return this.userService.loginUser(inputUserLogin);
  }

  @Query(() => Boolean)
  async checkUserExistence(
    @Arg("username") username: string,
    @Arg("email") email: string
  ): Promise<boolean> {
    return this.userService.checkUserExistence(username, email);
  }

  // @Authorized("admin")
  @Query(() => String)
  async adminQuery() {
    return "Your are admin";
  }

  @Query(() => User, { nullable: true })
  async getUserProfile(@Ctx() ctx: { email: string }): Promise<User | null> {
    if (!ctx.email) {
      throw new Error("User not authenticated");
    }
    return this.userService.getUserByEmail(ctx.email);
  }

  @Query(() => UserInfo)
  async whoAmI(@Ctx() ctx: { email: string; role: string }) {
    if (ctx.email !== undefined) {
      return { ...ctx, isLoggedIn: true };
    } else {
      return { isLoggedIn: false };
    }
  }
}
