import { UserContext } from "contexts/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

const DropdownMenuProfile = ({
  setMenuProfileVisible,
  // setMenuVisible,
}: any) => {
  const authInfo = useContext(UserContext);
  const router = useRouter();
  const authinfo = useContext(UserContext)

   const handleDisconnectUser = () => {
      localStorage.removeItem("jwt");
      authinfo.refetchLogin()
      setMenuProfileVisible(false);
      router.push("/login")
      //  router.reload();
   };

  return (
    <div className="absolute -right-6 z-10 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <Link
          href="/profile"
          passHref
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Accéder à son profil
        </Link>
        <div
          className="block px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          onClick={handleDisconnectUser}
        >
          Se déconnecter
        </div>
      </div>
    </div>
  );
};

export default DropdownMenuProfile;
