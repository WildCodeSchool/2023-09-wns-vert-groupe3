import { useQuery } from "@apollo/client";
import DisplayProd from "components/DisplayProd";
import LoadingProgress from "components/ui/LoadingProgress";
import { useRouter } from "next/router";
import { GET_PRODUCTS_BY_CATEGORY_ID } from "../../../lib/graphql/queries";
import styles from "../../../styles/pages/ProductsPage.module.scss";

const FilterPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY_ID, {
    variables: {
      categoryId: Number(categoryId),
    },
  });

  if (loading) return <LoadingProgress />;
  if (error) return `Error! ${error.message}`;

  const productsByCategory = data.getProductsByCategoryId;

  return (
    <main className={styles.productsPage}>
      <div>
        <DisplayProd
          key={categoryId?.toString()}
          products={productsByCategory}
        />
      </div>
    </main>
  );
};

export default FilterPage;
