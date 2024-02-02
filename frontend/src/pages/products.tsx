'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
    .then(response => {
      setProducts(response.data);
    })
      .catch(error => {
        console.error('Erreur lors de la récupération des produits :', error);
      });
  }, []);

  return (
    <div>
      <h2>Liste des Produits :</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Description : {product.description}</p>
            <p>Prix : {product.price} €</p>
            <p>Quantité disponible : {product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
