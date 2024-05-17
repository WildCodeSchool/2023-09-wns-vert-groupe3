import { ProductType } from "lib/graphql/queries";

import CardProductRent from "components/cards/product-rent/CardProductRent";

type DisplayProdType = {
  products: ProductType[];
};

const DisplayProd = ({ products }: DisplayProdType) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {products.map((product) => (
        <CardProductRent key={product.id} {...product} />
      ))}
    </div>
  );
};

export default DisplayProd;
