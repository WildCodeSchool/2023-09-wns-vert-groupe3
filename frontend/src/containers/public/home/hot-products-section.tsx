import { useQuery } from "@apollo/client";
import DisplayProd from "components/DisplayProd";
import LoadingProgress from "components/ui/LoadingProgress";
import { GET_PRODUCTS } from "lib/graphql/queries";
import { HiPlusCircle } from "react-icons/hi";

import styles from "styles/pages/ProductsPage.module.scss";

const HomeHotProductsSection = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <LoadingProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.getAllproducts;

  return (
    <section className="mt-32 flex flex-col gap-2">
      <div className="justifiy-center fit-content mb-4 flex">
        <HiPlusCircle className="mr-2 text-4xl text-blue-500" />
        <h2 className="w-fit items-center border-b-2 border-b-blue-500 text-2xl font-bold">
          Les nouveautés
        </h2>
      </div>
      <main className={styles.productsPage}>
        <DisplayProd products={products} />
      </main>
    </section>
  );
};

export default HomeHotProductsSection;
