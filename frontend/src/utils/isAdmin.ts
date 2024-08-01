import { User } from "types/user";

export const isAdmin = (user: User): boolean => {
  const userIsAdmin: boolean = user.isLoggedIn && user.role === "admin";
  return userIsAdmin;
};
