import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/pages/ProfilePage.module.scss";

export default function Component() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <main className={styles.profilePage}>
        <div className="mb-4 flex items-center">
          <p className="mr-6">Bienvenue {session.user?.name}.</p>
          <img
            src={session.user.image}
            alt="user image profile"
            className="w-16 rounded-full"
          />
        </div>
        <p>Enregistré avec l&apos;adresse : {session.user?.email}</p>
        <br />
        <button className="underline" onClick={() => signOut()}>
          Se déconnecter
        </button>
      </main>
    );
  }
  return (
    <>
      <p className="m-auto">Vous n&apos;êtes pas connecté</p>
      <br />
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => signIn()}
      >
        S&apos;enregistrer avec GitHub
      </button>
    </>
  );
}
