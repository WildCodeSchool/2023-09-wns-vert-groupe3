import { useQuery } from "@apollo/client";
import DisplayProd from "components/DisplayProd";
import BackNavigation from "components/ui/BackNavigation";
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
  const categoryName = productsByCategory[0]?.category?.name;

  return (
    <main className={styles.productsPage}>
      <BackNavigation />
      <div>
        <h3 className="mb-16 mt-0.5 text-2xl">
          Voici les produits correspondants pour la catégorie :
          <span className="ml-2 h-full rounded-lg bg-indigo-500 py-1 pe-2 ps-2">
            {categoryName}
          </span>
        </h3>

        <DisplayProd
          key={categoryId?.toString()}
          products={productsByCategory}
        />
      </div>
    </main>
  );
};

export default FilterPage;
