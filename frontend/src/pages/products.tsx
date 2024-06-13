import { useQuery } from "@apollo/client";
import CategoriesFilter from "components/CategoriesFilter";
import BackNavigation from "components/ui/BackNavigation";
import LoadingProgress from "components/ui/LoadingProgress";
import DisplayProd from "../components/DisplayProd";
import { GET_PRODUCTS } from "../lib/graphql/queries";
import styles from "../styles/pages/ProductsPage.module.scss";

const ProductsPage = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <LoadingProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.getAllproducts;
  const navigation = "./";
  return (
    <main className={styles.productsPage}>
      <BackNavigation navigation={navigation} />
      <CategoriesFilter />
      <div>
        <DisplayProd products={products} />
      </div>
    </main>
  );
};

export default ProductsPage;
