import CartPage from "components/Cart/CartPage";
import { UserContext } from "contexts/UserContext";
import { useRouter } from "next/router";
import { useContext } from "react";

const Cart = () => {
   const authInfo = useContext(UserContext);

  const router = useRouter();
  if (authInfo.isLoggedIn === false) {
    router.push("/login");
  }
//   if (localStorage.getItem("jwt") === null) {
//     router.push("/login");
//   }
  return (
    <main>
      <CartPage />
    </main>
  );
};

export default Cart;
