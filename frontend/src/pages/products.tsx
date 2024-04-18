import LoadingProgress from 'components/ui/LoadingProgress';
import React from 'react'
import styles from "../styles/pages/ProductsPage.module.scss"
import DisplayProd from '../components/DisplayProd';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../lib/graphql/queries';

const ProductsPage = () => {
   const { data, loading, error } = useQuery(GET_PRODUCTS);
   console.log('data :', data);
   

  if (loading) return <LoadingProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const products = data.getAllproducts;
  return (
    <main className={styles.productsPage}>
      <div>
        <DisplayProd products={products} />
      </div>
    </main>
  );
};

export default ProductsPage;
