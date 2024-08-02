import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import { InputUserCreate, InputUserLogin } from "inputs";
import { User, UserRoleType } from "../entities/user.entity";

export class UserService {
   async createUser(inputUserCreate: InputUserCreate): Promise<User> {
      try {
         const existingUser = await User.findOne({
            where: [
               { email: inputUserCreate.email },
               { username: inputUserCreate.username },
            ],
         });

         if (existingUser) {
            throw new Error("User with this email or username already exists");
         }

         const newUser = new User();
         newUser.email = inputUserCreate.email;
         newUser.username = inputUserCreate.username;
         newUser.hashedPassword = await argon2.hash(inputUserCreate.password);
         newUser.role = "user";
         return await newUser.save();
      } catch (error) {
         console.error("Error while creating new user :", error);
         throw new Error("Error while creating new user");
      }
   }

   async loginUser(inputUserLogin: InputUserLogin): Promise<string> {
      let payload: { email: string; role: UserRoleType; username: string };
      try {
         const user = await User.findOne({
            where: { email: inputUserLogin.email },
         });
         if (!user) {
            throw new Error("User not found");
         }

         if (
            !(await argon2.verify(user.hashedPassword, inputUserLogin.password))
         ) {
            throw new Error("Invalid password");
         }

         // Transmission du payload dans jwt.sign et réception du payload dans jwt.verify
         payload = { email: user.email, role: user.role, username: user.username };

         // Signature du token avec une clé secrète
         const token = jwt.sign(payload, "mysupersecretkey", { expiresIn: '24h' });

         return token;
      } catch (error) {
         console.error("Error while login :", error);
         throw new Error(error.message);
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
         console.error("Error while deleting user :", error);
         throw new Error("Error while deleting user");
      }
   }

   async adminQuery(): Promise<string> {
      return "You are admin";
   }

   async getUserByEmail(email: string): Promise<User | null> {
      try {
         const user = await User.findOne({ where: { email } });
         return user;
      } catch (error) {
         console.error("Error while fetching user by email:", error);
         throw new Error("Error while fetching user");
      }
   }
}
