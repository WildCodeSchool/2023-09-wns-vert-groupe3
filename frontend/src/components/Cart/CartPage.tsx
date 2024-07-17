import CartProduct from "components/cart/CartProduct";
import CheckoutButton from "components/CheckoutButton";
import { useCart } from "contexts/CartContext";

// edit folder cart

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleRemove = (productId: any) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="mb-6 text-3xl font-semibold">Mon Panier</h1>
      {cart.length === 0 ? (
        <p className="text-lg">Votre panier est vide.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <CartProduct
              key={product.id}
              product={product}
              onRemove={handleRemove}
            />
          ))}
          <div className="mt-6 flex justify-between">
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
