import React from 'react';
//import styles from "../styles/ProductCard.module.css";

export type ProductCardProps = {
  id?: number;
  name: string;
  price: number;
  description: string;
  quantity: Float32Array;
  location: string;
  category: {
    id: number;
    name: string;
  };
};

const ProductCard = ({
  name,
  description,
  price,
  quantity,
  location,
  category,

}: ProductCardProps) => {
  return (
    <div>

      <div>
        {name}
      </div>
      <div>
        {description}
      </div>
      <div>
        {price}
      </div>
      <div>
        {quantity}
      </div>
      <div>
        {location}
      </div>

    </div>
  );
};

export default ProductCard;
