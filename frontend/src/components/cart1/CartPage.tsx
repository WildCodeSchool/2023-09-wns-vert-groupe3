import CartProduct from "components/cart1/CartProduct";
import CheckoutButton from "components/CheckoutButton";
import { useCart } from "contexts/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleRemove = (productId: any) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="container mx-auto mt-5">
      {cart.length === 0 ? (
        <table className="min-w-full rounded-lg border-gray-300 bg-zinc-800 shadow-lg">
          <thead>
            <tr>
              <th className="rounded-t-lg bg-blue-500 px-6 py-4 text-left font-bold uppercase text-white">
                Mon Panier
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="rounded-lg px-6 py-8 text-center text-white">
                Votre panier est vide.
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="min-w-full rounded-lg border-gray-300 bg-zinc-800 shadow-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="rounded-t-lg bg-blue-500 px-6 py-4 text-left font-bold uppercase text-white">
                  Mon Panier
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <CartProduct product={product} onRemove={handleRemove} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-between px-6 py-4">
            <button
              onClick={handleClearCart}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Vider le panier
            </button>
            <CheckoutButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
