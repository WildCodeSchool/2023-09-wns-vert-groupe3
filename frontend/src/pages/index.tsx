import HomeHotProductsSection from "containers/public/home/hot-products-section";
import HomeIntroSection from "containers/public/home/intro-section";
import SummerProductsSection from "containers/public/home/summer-products";

export default function Home() {
  return (
    <>
      <HomeIntroSection />
      <HomeHotProductsSection />
      <SummerProductsSection />
    </>
  );
}
