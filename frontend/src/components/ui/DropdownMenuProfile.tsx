import Link from 'next/link'
import React from 'react'

const DropdownMenuProfile = ({ setMenuProfileVisible }: any) => {

   const handleDisconnectUser = () => {
      localStorage.removeItem("jwt")
      setMenuProfileVisible(false)
   }

   return (
      <div className="absolute w-48 -right-6 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
         <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link href="/profile" passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
               Accéder à son profil
            </Link>
            <Link href="/login" passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={handleDisconnectUser}>
               Se déconnecter
            </Link>
         </div>
      </div>
   )
}

export default DropdownMenuProfile