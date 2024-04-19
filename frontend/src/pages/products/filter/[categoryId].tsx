import { useQuery } from "@apollo/client";
import DisplayProd from "components/DisplayProd";
import LoadingProgress from "components/ui/LoadingProgress";
import { GET_PRODUCTS_BY_CATEGORY_ID } from "../../../lib/graphql/queries";
import styles from "../../../styles/pages/ProductsPage.module.scss";

const FilterPage = ({ categoryId }: { categoryId: number }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY_ID, {
    variables: { categoryId: categoryId },
  });

  if (loading) return <LoadingProgress />;
  if (error) return `Error! ${error.message}`;

  const productsByCategory = data.getProductsByCategoryId;

  return (
    <main className={styles.productsPage}>
      <div>
        {productsByCategory?.map((product: any) => (
          <DisplayProd key={product.id} products={product} />
        ))}
      </div>
    </main>
  );
};

export default FilterPage;
