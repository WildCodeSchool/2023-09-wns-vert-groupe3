import { ReactNode } from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import MainHeader from "./headers/MainHeader";

const montserrat = Montserrat({
   subsets: ["latin"],
   variable: "--font_montserrat",
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
   title: "Wildrent",
   description: "Wildrent is a platform for renting out equipements.",
};

const Layout = ({ children }: { children: ReactNode }) => {
   return (
      // <html lang="fr" data-theme='dark' className={`${montserrat.variable}`}>
      //    <div className={`flex flex-col min-h-screen ${montserrat.variable}`} data-theme='dark' lang="fr">
      <div className="flex flex-col min-h-screen">
         <MainHeader />
         <main className="grow bg-neutral mx-6 md:mx-10 px-7 md:px-14 pt-10 pb-20 rounded-t-3xl">
            {children}
         </main>
      </div>
      //    </div>
      // </html >
   );
}

export default Layout;
