import Link from "next/link";

const DropdownMenu = () => {
  return (
    <div className="absolute -right-6 z-10 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <Link
          href="/backoffice/productslist"
          passHref
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Gestion des articles
        </Link>
        <Link
          href="/products/add"
          passHref
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Ajouter un article
        </Link>
        <Link
          href="/products/category/addCategory"
          passHref
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Ajouter une catégorie
        </Link>
      </div>
    </div>
  );
};

export default DropdownMenu;
