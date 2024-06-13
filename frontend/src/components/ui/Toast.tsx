import React from 'react'
import { toast } from "react-toastify";

export const toastSuccessRegister = () => toast.success(
   <div>
      Compte créé avec succès !
      <br />
      Vous pouvez désormais vous connecter.
   </div>,
   {
      autoClose: 5000,
   },
);

export const toastSuccessLogin = () => toast.success(
   <div>
      Connexion réussie !
      <br />
      Bienvenue sur votre espace personnel !
   </div>,
   {
      autoClose: 5000,
   },
);

