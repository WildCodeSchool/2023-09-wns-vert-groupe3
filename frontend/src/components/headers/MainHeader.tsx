import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

import styles from "../../styles/components/MainHeader.module.scss";

export default function MainHeader() {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleSearch = () => setSearchActive(!searchActive);

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  return (
    <main className={styles.mainHeader}>
      <header
        className={`${styles.header} flex items-center justify-between px-10 py-5`}
      >
        <div className={styles.leftLinks}>
          <Link href="/" className="flex items-center gap-1">
            <div className="relative h-14 w-14 overflow-hidden rounded-full">
              <Image
                src="/wildrent-logo.png"
                alt="Wildrent logo"
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold uppercase">Wildrent</h1>
          </Link>
        </div>
        <div className="relative flex items-center">
          <div className="flex items-center">
            <input
              type="text"
              placeholder={searchActive ? "Rechercher..." : ""}
              value={searchActive ? searchValue : ""}
              onChange={handleInputChange}
              readOnly={!searchActive}
              className={`${
                searchActive ? "w-60 pl-8 pr-7" : "w-9"
              }  overflow-hidden rounded-full	border text-black transition-all duration-300 focus:border-blue-500 focus:outline-none ${
                styles.searchInput
              } ${!searchActive && "cursor-pointer"}`}
              style={{
                borderRadius: "10px",
                borderColor: "#5461fc",
                borderWidth: "2px",
              }}
            />
            <div
              className="absolute inset-y-0 left-0 flex items-center pl-2.5"
              onClick={toggleSearch}
            >
              <IoMdSearch className="cursor-pointer stroke-2 text-black" />
            </div>
            {searchActive && (
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                onClick={() => {
                  setSearchActive(false);
                  setSearchValue("");
                }}
              >
                <FaTimes className="cursor-pointer text-black" />
              </div>
            )}
          </div>
        </div>
        <div className={styles.rightLinks}>
          <Link href="/products">
            <span className={styles.allArticles}>Tous les articles</span>
          </Link>
          <Link href="/products/add">
            <FaPlus className="text-black" size={35} />
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
