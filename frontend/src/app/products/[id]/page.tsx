import React from 'react'
import styles from "../../../styles/pages/ProductsIdPage.module.css"

const ProductsIdPage = ({ params }: any) => {
  return (
    <main className={styles.productsIdPage}>
      <div>
        <h2 className={styles.title}>Products Id Page !</h2>
        <p>{params.id}</p>
      </div>
    </main>
  )
}

export default ProductsIdPage