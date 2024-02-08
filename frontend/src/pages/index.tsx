import HomeIntroSection from "@/containers/public/home/HomeIntroSection";
import HomeHotProductsSection from "@/containers/public/home/HomeHotProductsSection";
// import styles from "../styles/HomePage.module.scss"


export default function Home() {
  return (
    <main /* className={styles.homePage} */>
      <HomeIntroSection />
      <HomeHotProductsSection />
    </main>
  );
}
