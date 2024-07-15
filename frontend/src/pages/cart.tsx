import React from 'react'
import styles from "../styles/pages/CartPage.module.scss"
import { useRouter } from 'next/router'

const CartPage = () => {
   const router = useRouter()
   if(localStorage.getItem("jwt") === null) {
      router.push ("/login")
   }
  return (
    <main className={styles.cartPage}>
      <div>cart page !</div>
    </main>
  );
};

export default CartPage;
