import { toast } from "react-toastify";

export const toastSuccessRegister = () =>
  toast.success(
    <div>
      <b>Compte créé avec succès !</b>
      <br />
      Vous pouvez désormais vous connecter.
    </div>,
    {
      autoClose: 5000,
    },
  );

export const toastSuccessLogin = () =>
  toast.success(
    <div>
      Connexion réussie !
      <br />
      Bienvenue sur votre espace personnel !
    </div>,
    {
      autoClose: 5000,
    },
  );

export const toastError = () =>
  toast.error("Erreur", {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

export const toastSuccess = () =>
  toast.success("Succès", {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

export const toastErrorContext = (value: any) =>
  toast.error(value, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
