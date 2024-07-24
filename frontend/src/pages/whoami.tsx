import { useQuery } from "@apollo/client";
import LoadingProgress from "components/ui/LoadingProgress";
import { WHO_AM_I } from "lib/graphql/queries";
import { FaCircle } from "react-icons/fa";

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
  console.log(user);

  if (!user) {
    return <div>Aucun utilisateur trouvé. Veuillez vous connecter.</div>;
  }

  return (
    <div>
      <h1>Informations de l&apos;utilisateur</h1>
      <div>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <p className="flex items-center">
          Connecté:
          {user.isLoggedIn ? (
            <FaCircle className="ml-1 text-green-500" />
          ) : (
            <FaCircle className="ml-1 text-red-500" />
          )}
        </p>
      </div>
    </div>
  );
};

export default WhoAmI;
