import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { GET_PRODUCT_BY_ID, ProductType } from "lib/graphql/queries";

import Tabs, { TabItem } from "components/Tabs";
import LoadingProgress from "components/ui/LoadingProgress";

import ProductDtsPriceSidebar from "containers/public/product-dts/price-sidebar";

const ProductDtsPresSection = () => {
  const router = useRouter();
  const { productId } = router.query;

  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId: Number(productId) },
  });

  if (loading) return <LoadingProgress />;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);

  const product: ProductType = data.getProductById;

  return (
    <section className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      <article className="lg:col-span-2">
        <div className="grid min-h-96 grid-cols-3 gap-2 overflow-hidden rounded-xl">
          <div className="relative col-span-2">
            <Image
              fill
              sizes="80vw"
              priority={true}
              alt="product image"
              src={product.picture}
              className="object-cover object-center"
            />
          </div>
          <div className="col-span-1 grid grid-rows-3 gap-2">
            <div className="relative">
              <Image
                fill
                sizes="40vw"
                src="https://via.placeholder.com/525"
                alt="product image"
                className="object-cover object-center"
              />
            </div>
            <div className="relative">
              <Image
                fill
                sizes="40vw"
                src="https://via.placeholder.com/525"
                alt="product image"
                className="object-cover object-center"
              />
            </div>
            <div className="relative">
              <Image
                fill
                sizes="40vw"
                src="https://via.placeholder.com/525"
                alt="product image"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="opacity-70">{product.description_short}</p>
        </div>
        <section className="mt-8">
          <Tabs defaultValue="descri">
            <TabItem name="Description" keyId="descri">
              <p>
                {product.description_long || (
                  <em>NO DESCRIPTION AVAILABLE...</em>
                )}
              </p>
            </TabItem>
            <TabItem name="Features" keyId="features">
              <p>Features content</p>
            </TabItem>
          </Tabs>
        </section>
      </article>
      <ProductDtsPriceSidebar product={product} />
    </section>
  );
}

export default ProductDtsPresSection;