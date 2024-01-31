import Image from "next/image";
import styles from "../styles/page.module.scss"


export default function Home() {
   return (
      <main className={styles.home}>
         <header className={styles.header}>
               <h1 className={styles.title}>Home works !</h1>
         </header>
      </main>
   );
}