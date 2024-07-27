import CartPage from "components/cart/CartPage";
import { UserContext } from "components/Layout";
import { useRouter } from "next/router";
import { useContext } from "react";

const Cart = () => {
  const authInfo = useContext(UserContext);
  const router = useRouter();

  if (!authInfo.isLoggedIn) {
    router.push("/login");
  }

  return (
    <main>
      <CartPage />
    </main>
  );
};

export default Cart;
