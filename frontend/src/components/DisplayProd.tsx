import CardProductRent, {
  CardProductRentProps,
} from "./cards/product-rent/CardProductRent";

type DisplayProdType = {
  products: CardProductRentProps[];
};

const DisplayProd = ({ products }: DisplayProdType) => {
  //    console.log('products : ', products);

  return (
    <div className="grid grid-cols-2 gap-6">
      {products.map((product) => (
        <CardProductRent key={product.id} {...product} />
      ))}
    </div>
  );
};

export default DisplayProd;
