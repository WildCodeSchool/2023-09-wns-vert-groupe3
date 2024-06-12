import { UserContext } from "../components/Layout";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "lib/graphql/queries";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {

   // const router = useRouter();
   // const authInfo = useContext(UserContext);
   // const [handleLogin] = useLazyQuery(LOGIN, {
   //   async onCompleted(data) {
   //     localStorage.setItem("jwt", data.login);
   //     authInfo.refetchLogin();
   //     router.push("/");
   //   },
   // });
   
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const registrationSuccess = localStorage.getItem("registrationSuccess");
    if (registrationSuccess) {
      toast.success(
        <div>
          Compte créé avec succès!
          <br />
          Vous pouvez désormais vous connecter.
        </div>,
        {
          autoClose: 5000,
        },
      );
      localStorage.removeItem("registrationSuccess");
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const eyeIcon = showPassword ? <HiEyeOff /> : <HiEye />;

    return (
      <>
        <div className="flex justify-center">
          <div className="w-full rounded-lg bg-white shadow md:max-w-lg xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <div className="mb-6 flex items-center">
                <Link
                  href="./"
                  className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
                >
                  <Image
                    src="/wildrent-logo.png"
                    alt="test"
                    width={50}
                    height={50}
                  />
                </Link>
                <h1 className="ml-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Se connecter à votre compte
                </h1>
              </div>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="name@domain.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                      onClick={togglePasswordVisibility}
                    >
                      {eyeIcon}
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className=" focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 cursor-pointer rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500 dark:text-gray-300">
                        Se souvenir de moi
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Se connecter
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Vous n&apos;avez pas encore de compte ?{" "}
                  <Link
                    href="/register"
                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                  >
                    S&apos;enregistrer
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  };

export default LoginPage;
