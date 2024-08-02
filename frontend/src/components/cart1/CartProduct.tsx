const CartProduct = ({ product, onRemove }: any) => {
  const handleRemove = () => {
    onRemove(product.id);
  };

  console.log(product);

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center space-x-4">
        <img
          src={product.picture[0]}
          alt={product.name}
          className="h-20 w-20 rounded-lg bg-white object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-300">Prix unitaire: {product.price_fixed}€</p>
          <div className="mt-1 flex items-center space-x-2">
            <button
              className="rounded bg-red-400 px-2 py-1 hover:bg-red-700"
              onClick={handleRemove}
            >
              Retirer
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold">
          {product.price_fixed * product.quantity} €
        </p>
        <p className="text-gray-300">Quantité: {product.quantity}</p>
      </div>
    </div>
  );
};

export default CartProduct;
