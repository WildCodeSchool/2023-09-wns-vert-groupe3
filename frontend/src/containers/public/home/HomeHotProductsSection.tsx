import DisplayProd from "components/DisplayProd";
import LoadingProgress from "components/ui/LoadingProgress";
import { GET_PRODUCTS } from "lib/graphql/queries";
import styles from "styles/pages/ProductsPage.module.scss";
import { useQuery } from "@apollo/client";

const HomeHotProductsSection = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <LoadingProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.getAllproducts;

  return (
    <section className="mt-32 flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Les nouveautés</h2>
      <main className={styles.productsPage}>
        <div>
          <DisplayProd products={products} />
        </div>
      </main>
    </section>
  );
};

export default HomeHotProductsSection;
