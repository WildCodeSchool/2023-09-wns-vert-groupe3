import { useQuery } from "@apollo/client";
import LoadingProgress from "components/ui/LoadingProgress";
import { UserContext } from "contexts/UserContext";
import { WHO_AM_I } from "lib/graphql/queries";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { User } from "types/user";
import MainHeader from "./headers/MainHeader";

export const metadata: Metadata = {
  title: "Wildrent",
  description: "Wildrent is a platform for renting out equipements.",
};

const Layout = ({ children }: { children: ReactNode }) => {
   const { data, loading, error, refetch } = useQuery<{ whoAmI: User}>(WHO_AM_I);

  if (loading) return <LoadingProgress />;

  if (error) {
    <p>Error</p>;
    return console.log(error);
  }

  if (data) {
    console.log("whoamidata", data);
    console.log("email :", data.whoAmI.email);
    console.log("role :", data.whoAmI.role);
    console.log("isLoggedIn :", data.whoAmI.isLoggedIn);
    
    return (
      <UserContext.Provider
        value={{
          isLoggedIn: data.whoAmI.isLoggedIn,
          refetchLogin: refetch,
          role: data.whoAmI.role,
          email: data.whoAmI.email
        }}
      >
        <div className="flex min-h-screen flex-col">
          <MainHeader />
          <main className="mx-6 grow rounded-t-3xl bg-neutral px-7 pb-20 pt-10 md:mx-10 md:px-14">
            {children}
          </main>
        </div>
      </UserContext.Provider>
    );
  }
};

export default Layout;
