import { useQuery } from "@apollo/client";
import CardProductRent from "components/cards/product-rent/CardProductRent";
import LoadingProgress from "components/ui/LoadingProgress";
import { GET_PRODUCTS } from "lib/graphql/queries";
import { LuSun } from "react-icons/lu";

const HomeHotProductsSection = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <LoadingProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.getAllproducts;

  const filteredProducts = products.filter(
    (product: any) =>
      product.category?.name === "Escalade" ||
      product.category?.name === "Camping",
  );

  return (
    <section className="mt-32 flex flex-col gap-2">
      <div className="justifiy-center fit-content mb-4 flex">
        <LuSun className="mr-2 text-4xl text-yellow-200" />
        <h2 className="w-fit items-center border-b-2 border-b-yellow-200 text-2xl font-bold">
          Parfait pour l&apos;été
        </h2>
      </div>
      <main className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredProducts.map((product: any) => (
          <CardProductRent key={product.id} {...product} />
        ))}
      </main>
    </section>
  );
};

export default HomeHotProductsSection;
