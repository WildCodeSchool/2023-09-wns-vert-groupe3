import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "lib/graphql/queries";
import { HiPlusCircle } from "react-icons/hi";

import CardProductSkeleton from "components/cards/product-rent/CardProductSkeleton";
import DisplayProd from "components/DisplayProd";
import { useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "styles/pages/ProductsPage.module.scss";

const HomeHotProductsSection = () => {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    refetch();
  });

  if (loading) {
    return (
      <section className="mt-32 flex flex-col gap-2">
        <div className="fit-content mb-4 flex">
          <HiPlusCircle className="mr-2 text-4xl text-blue-500" />
          <h2 className="w-fit border-b-2 border-b-blue-500 text-2xl font-bold">
            Les nouveautés
          </h2>
        </div>
        <main className={styles.productsPage}>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
            {[...Array(4)].map((_, index) => (
              <CardProductSkeleton key={index} />
            ))}
          </div>
        </main>
      </section>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  const products = data.getAllproducts;

  return (
    <>
      <section className="mt-32 flex flex-col gap-2">
        <div className="fit-content mb-4 flex">
          <HiPlusCircle className="mr-2 text-4xl text-blue-500" />
          <h2 className="w-fit border-b-2 border-b-blue-500 text-2xl font-bold">
            Les nouveautés
          </h2>
        </div>
        <main className={styles.productsPage}>
          <DisplayProd products={products} />
        </main>
      </section>
    </>
  );
};

export default HomeHotProductsSection;
