import { useCart } from "contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaShoppingBag, FaUserCircle } from "react-icons/fa";

import { RiListSettingsLine } from "react-icons/ri";

import { UserContext } from "components/Layout";
import DropdownMenu from "components/ui/DropdownMenu";
import DropdownMenuProfile from "components/ui/DropdownMenuProfile";
import SearchInput from "components/ui/SearchInput";
import styles from "../../styles/components/MainHeader.module.scss";
import { UserContext } from "contexts/UserContext";

export default function MainHeader() {
const authinfo = useContext(UserContext)
const refetchLogin = authinfo.refetchLogin()
const isAdmin = authinfo.role === "admin"
const isLoggedIn = authinfo.isLoggedIn

  useEffect(() => {
    authinfo.refetchLogin();
  }, [refetchLogin]);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuProfileVisible, setMenuProfileVisible] = useState(false);

  const { cart } = useCart();

  const cartItemCount = cart.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  const toggleSearch = () => setSearchActive(!searchActive);
  const toggleMenu = () => setMenuVisible(!menuVisible);
  const toggleMenuProfile = () => setMenuProfileVisible(!menuProfileVisible);

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
            <SearchInput />
          </div>
        </div>
        <div className={styles.rightLinks}>
          <Link href="/products" className={styles.allArticles}>
            <span>Tous les articles</span>
          </Link>

          {(isAdmin) && (
            <div
              className="relative"
              onMouseEnter={() => setMenuVisible(true)}
              onMouseLeave={() => setMenuVisible(false)}
            >
              <RiListSettingsLine
                className="cursor-pointer text-white ease-out hover:text-indigo-500"
                size={32}
              />
              {menuVisible && <DropdownMenu />}
            </div>
          ) : null}

         {(!isAdmin) && (
            <Link href="/cart">
               <div className="relative ease-out hover:scale-90 hover:text-indigo-500">
                  <FaShoppingBag size={32} className="relative" />
                  <div className="absolute -bottom-3 -right-3 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                     {cartItemCount}
                  </div>
               </div>
            </Link>)}

          {isLoggedIn ? (
            <div
              className="relative"
              onMouseEnter={() => setMenuProfileVisible(true)}
              onMouseLeave={() => setMenuProfileVisible(false)}
            >
              <FaUserCircle
                className="text-white ease-out hover:scale-90 hover:text-indigo-500"
                size={32}
              />
              {menuProfileVisible && (
                <DropdownMenuProfile
                  setMenuProfileVisible={setMenuProfileVisible}
                />
              )}
            </div>
          ) : (
            <Link href="/login">
              <div>
                <FaUserCircle
                  className="text-white ease-out hover:scale-90 hover:text-indigo-500"
                  size={32}
                />
              </div>
            </Link>
          )}
        </div>
      </header>
    </main>
  );
}
