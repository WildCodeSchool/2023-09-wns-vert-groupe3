import { toastSuccessLogin } from "components/ui/Toast";
import ContactSection from "containers/public/home/contact-section";
import HomeHotProductsSection from "containers/public/home/hot-products-section";
import HomeIntroSection from "containers/public/home/intro-section";
import SummerProductsSection from "containers/public/home/summer-products";
import { useEffect } from "react";

export default function Home() {

   // TODO: Toast à implementer lors de la connexion réussie et de la redirection vers la page d'accueil
   // useEffect(() => {
   //    const LoginSuccess = localStorage.getItem("LoginSuccess");
   //    if (LoginSuccess) {
   //       toastSuccessLogin()
   //       localStorage.removeItem("LoginSuccess");
   //    }
   // }, []);

  return (
    <>
      <HomeIntroSection />
      <HomeHotProductsSection />
      <SummerProductsSection />
      <ContactSection />
    </>
  );
}
