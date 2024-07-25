import { User } from "../types/user";

export const isLoggedIn = (user: User): boolean => {
  const isLoggedIn: boolean =
    user.isLoggedIn && localStorage.getItem("jwt") !== null;
  return isLoggedIn;
};
