import { Context } from "@apollo/client";
import { getSession, signOut, useSession } from "next-auth/react";
import styles from "../styles/pages/ProfilePage.module.scss";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <main className={styles.profilePage}>
        <p>Bienvenue sur votre profile {session.user?.name}</p>
        <button onClick={() => signOut()} className="underline">
          Déconnexion
        </button>
      </main>
    );
  } else {
    return (
      <div>
        <p>Vous n&apos;êtes pas connecté</p>
        <br />
      </div>
    );
  }
};

export const getServerSideProps = async (context: Context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: { session },
  };
};

export default ProfilePage;
