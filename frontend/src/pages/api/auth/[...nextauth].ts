import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const githubClientId = process.env.ID_GITHUB || "";
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
  secret: "ArtTf+Rd1lqGSIO4cFRAcm9DrvWSpr0jLzZusmtZzps=",
};

export default NextAuth(authOptions);
