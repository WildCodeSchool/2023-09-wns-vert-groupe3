import DisplayProd from "@/components/DisplayProd";
import LoadingProgress from "@/components/ui/LoadingProgress";
import { GET_PRODUCTS } from "@/lib/graphql/queries";
import { useQuery } from "@apollo/client";
import styles from "../styles/pages/ProductsPage.module.scss";

const ProductsPage = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <LoadingProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.getAllproducts;
  return (
    <main className={styles.productsPage}>
      <div>
        <DisplayProd products={products} />
      </div>
    </main>
  );
};

export default ProductsPage;
