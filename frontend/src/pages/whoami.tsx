import { useQuery } from "@apollo/client";
import LoadingProgress from "components/ui/LoadingProgress";
import { WHO_AM_I } from "lib/graphql/queries";

interface User {
  email: string;
  isLoggedIn: boolean;
  role: string;
}

const WhoAmI = () => {
  const { loading, error, data } = useQuery<{ whoAmI: User }>(WHO_AM_I);

  if (loading) return <LoadingProgress />;

  if (error) {
    console.error(`Error fetching user data: ${error}`);
    return (
      <div>
        Une erreur est survenue lors de la récupération des informations de
        l&apos;utilisateur.
      </div>
    );
  }

  const user = data?.whoAmI;

  if (!user) {
    return <div>Aucun utilisateur trouvé. Veuillez vous connecter.</div>;
  }

  return (
    <div>
      <h1>Informations de l&apos;utilisateur</h1>
      <div>
        <p>
          <b>Email:</b> {user.email}
        </p>
        <p>
          <b>Role:</b> {user.role}
        </p>
        <p>Connecté: {user.isLoggedIn}</p>
      </div>
    </div>
  );
};

export default WhoAmI;
