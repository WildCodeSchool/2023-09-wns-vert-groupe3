import BackNavigation from "components/ui/BackNavigation";
import ProductDtsPresSection from "containers/public/product-dts/pres-section";

const ProductsIdPage = () => {
  const navigation = "./";
  return (
    <>
      <BackNavigation navigation={navigation} />
      <ProductDtsPresSection />
    </>
  );
};

export default ProductsIdPage;
