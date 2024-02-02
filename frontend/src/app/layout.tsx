import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ProductCard from '@/components/ProductCard';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wildrent",
  description: "Wildrent is a platform for renting out equipements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <main>{children}</main>
        <ProductCard {...ProductCard} />
      </body>
    </html>
  );
}
