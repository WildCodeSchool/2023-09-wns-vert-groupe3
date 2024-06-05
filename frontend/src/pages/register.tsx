import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const RegisterPage = () => {
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const eyeIcon = showPassword ? <HiEyeOff /> : <HiEye />;

  if (session) {
    return (
      <>
        <div className="mb-4 flex items-center">
          <p className="mr-6">Bienvenue {session.user?.name}.</p>
          <Image
            src={session.user?.image || ""}
            alt="user image profile"
            className="rounded-full"
            width={48}
            height={48}
          />
        </div>
        <p>Enregistré avec l&apos;adresse : {session.user?.email}</p>
        <br />
        <button className="underline" onClick={() => signOut()}>
          Se déconnecter
        </button>
      </>
    );
  } else {
    return (
      <>
        <div className="flex justify-center">
          <div className="w-full rounded-lg bg-white shadow md:max-w-lg xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <div className="mb-6 flex items-center">
                <a
                  href="#"
                  className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
                >
                  <Image
                    src="/wildrent-logo.png"
                    alt="test"
                    width={50}
                    height={50}
                  />
                </a>
                <h1 className="ml-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Créer un compte
                </h1>
              </div>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Nom d&apos;utilisateur
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Votre nom d'utilisateur"
                  />
                </div>
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
                <button
                  type="submit"
                  className="w-full rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  S&apos;enregistrer
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Vous avez déjà un compte ?{" "}
                  <a
                    href="../login"
                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                  >
                    Se connecter
                  </a>
                </p>
                <div className="before:border-white-300 after:border-white-300 my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t after:mt-0.5 after:flex-1 after:border-t">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                    OU
                  </p>
                </div>
                <div className="w-full">
                  <button
                    onClick={() => signIn()}
                    className="mb-3 flex w-full items-center justify-center rounded bg-black px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 30 30"
                    >
                      <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                    </svg>
                    Continuer avec GitHub
                  </button>
                </div>
                <div className="w-full">
                  <button className="mb-3 flex w-full items-center justify-center rounded bg-white px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-black transition duration-150 ease-in-out ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                    Continuer avec Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default RegisterPage;
