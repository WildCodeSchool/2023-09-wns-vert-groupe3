import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const githubClientId = process.env.GITHUB_ID || "";
const githubClientSecret = process.env.GITHUB_SECRET || "";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
