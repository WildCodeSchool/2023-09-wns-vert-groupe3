import Link from 'next/link'
import React from 'react'

const DropdownMenu = () => {
   return (
      <div className="absolute w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
         <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link href="/backoffice/productslist" passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
               Gestion des articles
            </Link>
            <Link href="/products/add" passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
               Ajouter un article
            </Link>
            <Link href="/categories/add" passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
               Ajouter une catégorie
            </Link>
         </div>
      </div>
   )
}

export default DropdownMenu