import Link from "next/link";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";

import styles from "./MainHeader.module.css"

export default function MainHeader() {
  return (
    <main className={styles.mainHeader}>
      <header className={`${styles.header} px-10 py-5`}>
        <div className={styles.leftLinks}>
          <Link href="/" className="flex gap-1 items-center">
            <Image
              src="/wildrent-logo.png"
              alt="Wildrent logo"
              width={56}
              height={56}
            />
            <h1 className="text-3xl font-bold uppercase">Wildrent</h1>
          </Link>
          <div className={styles.availability}>
            {/* Availability fields todo ! */}
            <input type="text" />
            <IoSearchSharp className={styles.logo} size={35} />
          </div>
        </div>
        {/* <div className="middleLinks">
        </div> */}
        <div className={styles.rightLinks}>
          <Link href="/products">
            <span className={styles.allArticles}>Tous les articles</span>
          </Link>

          <Link href="/products/add">
            <FaPlus size={35} />
            {/* <Image
              src="/images/header/plus.svg"
              alt="plus"
              width={30}
              height={30}
            /> */}
          </Link>
          <Link href="/">
            <Image
              src="/images/header/settings.svg"
              alt="settings"
              width={30}
              height={30}
            />
          </Link>
          <Link href="/cart">
            <Image
              src="/images/header/cart.svg"
              alt="cart"
              width={30}
              height={30}
            />
          </Link>
          <Link href="/profile">
            <Image
              src="/images/header/avatar.webp"
              alt="avatar"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </header>
    </main>
  );
}