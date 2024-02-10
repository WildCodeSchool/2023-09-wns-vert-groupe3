import { ReactNode } from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import MainHeader from "@/components/headers/MainHeader";

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
    <html lang="fr" data-theme='light' className={`${montserrat.variable}`}>
      <body className="flex flex-col min-h-screen">
        <MainHeader />
        <main className="grow bg-neutral mx-10 px-14 pt-10 pb-20 rounded-t-3xl">
          {children}
        </main>
      </body>
    </html>
  );
}

export default Layout;
