import type { Metadata } from "next";
import { ReactNode } from "react";
import MainHeader from "./headers/MainHeader";
import { createContext } from "vm";

// export const UserContext = createContext({
//    isLoggedIn: false,
//    refetchLogin: () => {},
//    role: "user"
// });

export const metadata: Metadata = {
  title: "Wildrent",
  description: "Wildrent is a platform for renting out equipements.",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    // <html lang="fr" data-theme='dark' className={`${montserrat.variable}`}>
    //    <div className={`flex flex-col min-h-screen ${montserrat.variable}`} data-theme='dark' lang="fr">
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <main className="mx-6 grow rounded-t-3xl bg-neutral px-7 pb-20 pt-10 md:mx-10 md:px-14">
        {children}
      </main>
    </div>
    //    </div>
    // </html >
  );
};

export default Layout;
