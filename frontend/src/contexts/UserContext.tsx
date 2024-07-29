import { createContext } from "react";

export const UserContext = createContext({
   isLoggedIn: false,
   refetchLogin: () => {},
   role: "user",
   email: ""
 });