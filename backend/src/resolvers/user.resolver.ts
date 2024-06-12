import { User, UserInfo } from "../entities/user.entity";
import { InputUser } from "../inputs";
import { UserService } from "../services/user.service";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";


@Resolver()
export default class UserResolver {
  private userService = new UserService();

  // @Authorized("admin")
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  // @Authorized("admin")
  @Mutation(() => String)
  async deleteUser(@Arg("userId") userId: string): Promise<string> {
    return this.userService.deleteUser(userId);
  }

//   @Mutation(() => User)
//   async createUser(@Arg("inputUser") inputUser: InputUser): Promise<User> {
//     return this.userService.createUser(inputUser);
//   }

  @Mutation(() => String)
  async register(@Arg("newUserData") newUserData: InputUser): Promise<string> {
    try {
      await this.userService.createUser(newUserData);
      return "New user was created with success";
    } catch (err) {
      console.log("err", err);
      return "Error while creating new user";
    }
  }

  @Mutation(() => String)
  async loginUser(@Arg("inputUser") inputUser: InputUser): Promise<string> {
    return this.userService.loginUser(inputUser);
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

  @Query(() => UserInfo)
  async whoAmI(@Ctx() ctx: { email: string; role: string }) {
    if (ctx.email !== undefined) {
      return { ...ctx, isLoggedIn: true };
    } else {
      return { isLoggedIn: false };
    }
  }
}
