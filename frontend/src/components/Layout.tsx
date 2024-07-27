import { useQuery } from "@apollo/client";
import LoadingProgress from "components/ui/LoadingProgress";
import { WHO_AM_I } from "lib/graphql/queries";
import type { Metadata } from "next";
import { ReactNode, createContext } from "react";
import MainHeader from "./headers/MainHeader";

export const UserContext = createContext({
  isLoggedIn: false,
  refetchLogin: () => {},
  role: "user",
});

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   variable: "--font_montserrat",
//   display: "swap",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

export const metadata: Metadata = {
  title: "Wildrent",
  description: "Wildrent is a platform for renting out equipements.",
};

const Layout = ({ children }: { children: ReactNode }) => {
  const { data, loading, error, refetch } = useQuery<{
    whoAmI: { isLoggedIn: boolean; role: string };
  }>(WHO_AM_I);

  if (loading) return <LoadingProgress />;

  if (error) {
    <p>Error</p>;
    return console.log(error);
  }

  if (data) {
    // console.log("whoamidata", data);
    return (
      // <html lang="fr" data-theme='dark' className={`${montserrat.variable}`}>
      //    <div className={`flex flex-col min-h-screen ${montserrat.variable}`} data-theme='dark' lang="fr">
      <UserContext.Provider
        value={{
          isLoggedIn: data.whoAmI.isLoggedIn,
          refetchLogin: refetch,
          role: data.whoAmI.role,
        }}
      >
        <div className="flex min-h-screen flex-col">
          <MainHeader />
          <main className="mx-6 grow rounded-t-3xl bg-neutral px-7 pb-20 pt-10 md:mx-10 md:px-14">
            {children}
          </main>
        </div>
      </UserContext.Provider>
      //    </div>
      // </html >
    );
  }
};

export default Layout;
