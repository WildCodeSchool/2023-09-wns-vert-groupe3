import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import { User, UserInfo } from "../entities/user.entity";
import { InputUser } from "../inputs";

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
  async login(@Arg("UserData") userData: InputUser) {
    try {
      const user = await User.findOneOrFail({
        where: { username: userData.username },
      });

      const payload = { email: user.email, username: user.username };
      const token = jwt.sign(payload, "mysupersecretkey", { expiresIn: "12h" });

      return token;
    } catch (error) {
      throw new Error("Utilisateur non trouvé ou mot de passe incorrect.");
    }
  }

  @Authorized("admin")
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
