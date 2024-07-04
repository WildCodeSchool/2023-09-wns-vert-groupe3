// src/components/checkoutbutton.tsx

import { gql, useMutation } from "@apollo/client";
import LoadingButton from "components/ui/LoadingButton";
import { useCart } from "contexts/CartContext";
import { IoBagCheckOutline } from "react-icons/io5";

const CREATE_CHECKOUT_SESSION = gql`
  mutation CreateCheckoutSession($products: [InputCartProduct!]!) {
    createCheckoutSession(products: $products)
  }
`;

const CheckoutButton = () => {
  const { cart } = useCart();
  const [createCheckoutSession, { loading, error, data }] = useMutation(
    CREATE_CHECKOUT_SESSION,
    {
      onError: (error) => {
        console.error("Mutation error:", error);
      },
      onCompleted: (data) => {
        window.location.assign(data.createCheckoutSession);
      },
    },
  );

  const handleCheckout = () => {
    const products = cart.map((product) => ({
      id: parseInt(product.id),
      name: product.name,
      // picture: product.picture,
      price: product.price,
      quantity: product.quantity,
    }));

    createCheckoutSession({ variables: { products } });
  };

  if (loading) return <LoadingButton />;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  return (
    <button
      onClick={handleCheckout}
      type="button"
      className="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      Commander
      <IoBagCheckOutline className="ml-2" />
    </button>
  );
};

export default CheckoutButton;
