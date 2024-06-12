import { Context } from "@apollo/client";
import { getSession, signOut, useSession } from "next-auth/react";
import styles from "../styles/pages/ProfilePage.module.scss";

export const getServerSideProps = () => {
   return {
     redirect: {
       destination: "/login",
     },
   };
};

const ProfilePage = () => {
   return (
      <main className={styles.profilePage}>
         <p>Bienvenue sur votre profil </p>
         <button className="underline">
            Déconnexion
         </button>
      </main>
   );
}
export default ProfilePage;
