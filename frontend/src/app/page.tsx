import Image from "next/image";
import styles from "../styles/page.module.scss"


export default function Home() {
   return (
      <main className={styles.home}>
         <header className={styles.header}>
               <p className={styles.title}>Home works</p>
         </header>
      </main>
   );
}