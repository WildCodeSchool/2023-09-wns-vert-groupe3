import { useQuery } from "@apollo/client";
import LoadingProgress from "components/ui/LoadingProgress";
import { GET_USER_PROFILE } from "lib/graphql/queries";
import { useRouter } from "next/router";
import { useEffect } from "react";

type User = {
  id: number;
  email: string;
  username: string;
  phone?: string;
  address?: string;
};

const ProfilePage = () => {
  const { loading, error, data, refetch } = useQuery<{ getUserProfile: User }>(
    GET_USER_PROFILE,
  );
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (error && error.message.includes("not authenticated")) {
      router.push("/login");
    }
  }, [error, router]);

  if (loading) return <LoadingProgress />;
  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }
  if (data) console.log(data);

  const user = data?.getUserProfile;

  return (
    <main className="flex justify-center">
      <div className="w-full max-w-2xl rounded-lg border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Profil de l&apos;utilisateur
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0 dark:border-gray-700">
          <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Nom d&apos;utilisateur
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">
                {user?.username || "N/A"}
              </dd>
            </div>
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Adresse e-mail
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">
                {user?.email || "N/A"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
