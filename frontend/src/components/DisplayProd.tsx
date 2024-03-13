import CardProductRent, { CardProductRentProps } from './cards/product-rent/CardProductRent';

type DisplayProdType = {
    products: CardProductRentProps[];
}

const DisplayProd = ({ products }: DisplayProdType) => {
    return (
        <div>
            {products.map((product) => (
                <CardProductRent key={product.id} {...product} />
            ))}
        </div>
    )
}

export default DisplayProd;