import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import { User, UserInfo, UserRoleType } from "../entities/user.entity";
import { InputUser } from "../inputs";

import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export default class UserResolver {
  // @Authorized("admin")
  @Query(() => [User])
  async getAllUsers() {
    const result = await User.find();
    return result;
  }

  // @Authorized("admin")
  @Mutation(() => Number)
  async deleteUser(@Arg("userId") userId: number) {
    const userToDelete = await User.findOneByOrFail({
      id: userId,
    });
    await userToDelete.remove();
    return userId;
  }

  @Mutation(() => String)
  async register(@Arg("newUserData") newUserData: InputUser) {
    try {
      const newUser = new User();
      newUser.username = newUserData.username;
      newUser.email = newUserData.email;
      newUser.hashedPassword = await argon2.hash(newUserData.password);
      newUser.role = "user";
      await newUser.save();
      return "New user was created with success";
    } catch (err) {
      console.log("err", err);
      return "Error while creating new user";
    }
  }

  @Query(() => String)
  async login(@Arg("UserData") UserData: InputUser) {
    let payload: { email: string; role: UserRoleType };
    const user = await User.findOneByOrFail({ email: UserData.email });
    console.log(user);
    if (
      (await argon2.verify(user.hashedPassword, UserData.password)) === false
    ) {
      throw new Error("invalid password");
    } else {
      payload = { email: user.email, role: user.role };
      const token = jwt.sign(payload, "mysupersecretkey");
      return token;
    }
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
