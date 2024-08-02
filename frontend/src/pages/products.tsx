import { useQuery } from "@apollo/client";
import CategoriesFilter from "components/CategoriesFilter";
import BackNavigation from "components/ui/BackNavigation";
import LoadingProgress from "components/ui/LoadingProgress";
import { ProductType } from "lib/graphql/queries";
import { useState } from "react";
import DisplayProd from "../components/DisplayProd";
import { GET_PRODUCTS } from "../lib/graphql/queries";
import styles from "../styles/pages/ProductsPage.module.scss";

const ProductsPage = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (loading) return <LoadingProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const products: ProductType[] = data.getAllproducts;

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.name === selectedCategory)
    : products;

  const navigation = "./";
  return (
    <main className={styles.productsPage}>
      <BackNavigation navigation={navigation} />
      <CategoriesFilter setSelectedCategory={setSelectedCategory} />
      <div>
        <DisplayProd products={filteredProducts} />
      </div>
    </main>
  );
};

export default ProductsPage;
