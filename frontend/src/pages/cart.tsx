import CartPage from "components/cart/CartPage";
import { useRouter } from "next/router";

const Cart = () => {
  const router = useRouter();
  if (localStorage.getItem("jwt") === null) {
    router.push("/login");
  }
  return (
    <main>
      <CartPage />
    </main>
  );
};

export default Cart;
