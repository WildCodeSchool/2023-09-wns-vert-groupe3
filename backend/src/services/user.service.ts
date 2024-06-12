import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import { InputUser } from "inputs";
import { User, UserRoleType } from "../entities/user.entity";

export class UserService {
  async createUser(inputUser: InputUser): Promise<User> {
    try {
      const existingUser = await User.findOne({
        where: [{ email: inputUser.email }, { username: inputUser.username }],
      });

      if (existingUser) {
        throw new Error("User with this email or username already exists");
      }

      const newUser = new User();
      newUser.email = inputUser.email;
      newUser.username = inputUser.username;
      newUser.hashedPassword = await argon2.hash(inputUser.password);
      newUser.role = "user";
      return await newUser.save();
    } catch (error) {
      console.error("Error while creating new user:", error);
      throw new Error("Error while creating new user");
    }
  }

  async loginUser(inputUser: InputUser): Promise<string> {
    let payload: { email: string; role: UserRoleType };
    try {
      const user = await User.findOne({ where: { email: inputUser.email } });
      if (!user) {
        throw new Error("User not found");
      }

      if (!(await argon2.verify(user.hashedPassword, inputUser.password))) {
        throw new Error("Invalid password");
      }

      payload = { email: user.email, role: user.role };
      const token = jwt.sign(payload, "mysupersecretkey");
      return token;
    } catch (error) {
      console.error("Error while login:", error);
      throw new Error("Error while login");
    }
  }

  async checkUserExistence(username: string, email: string): Promise<boolean> {
    const userByUsername = await User.findOne({ where: { username } });
    const userByEmail = await User.findOne({ where: { email } });

    return !!(userByUsername || userByEmail);
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await User.find();
    } catch (error) {
      console.error("Error while getting all users:", error);
      throw new Error("Error while getting all users");
    }
  }

  async deleteUser(userId: string): Promise<string> {
    try {
      const userToDelete = await User.findOneOrFail({
        where: { id: parseInt(userId, 10) },
      });
      await userToDelete.remove();
      return "User removed";
    } catch (error) {
      console.error("Error while deleting user:", error);
      throw new Error("Error while deleting user");
    }
  }

  async adminQuery(): Promise<string> {
    return "You are admin";
  }

  async whoAmI(
    email: string,
    role: UserRoleType
  ): Promise<{ isLoggedIn: boolean; email?: string; role?: UserRoleType }> {
    if (email) {
      return { isLoggedIn: true, email, role };
    } else {
      return { isLoggedIn: false };
    }
  }
}
