import * as argon2 from "argon2";
import { User, UserInfo, UserRoleType } from "../entities/user.entity";

import { InputUser } from "inputs";
import * as jwt from "jsonwebtoken";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export default class UserResolver {
  @Authorized("admin")
  @Query(() => [User])
  async getAllUsers() {
    const result = await User.find();
    return result;
  }

  @Authorized("admin")
  @Mutation(() => String)
  async deleteUser(@Arg("userId") userId: string) {
    const userToDelete = await User.findOneByOrFail({
      id: Number.parseInt(userId),
    });
    await userToDelete.remove();
    return "user removed";
  }

  @Mutation(() => String)
  async register(@Arg("newUserData") newUserData: InputUser) {
    try {
      const newUser = new User();
      newUser.email = newUserData.email;
      newUser.hashedPassword = await argon2.hash(newUserData.password);
      await newUser.save();
      return "ok";
    } catch (err) {
      console.log("err", err);
      return "error while creating new user";
    }
  }

  @Query(() => String)
  async login(@Arg("UserData") UserData: InputUser) {
    let payload: { email: string; role: UserRoleType };
    const user = await User.findOneByOrFail({ email: UserData.email });
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

  @Authorized("admin")
  @Query(() => String)
  async adminQuery() {
    return "you are admin";
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
