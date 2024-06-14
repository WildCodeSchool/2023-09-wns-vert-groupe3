import { useMutation } from "@apollo/client";
import { CREATE_USER } from "lib/graphql/mutations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { inputRegisterUser } from "types/inputRegisterUser";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputRegisterUser>();
  const [createUser, { loading, error: mutationError }] =
    useMutation(CREATE_USER);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<inputRegisterUser> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      await createUser({
        variables: {
          newUserData: {
            username: data.username,
            email: data.email,
            password: data.password,
          },
        },
      });

      localStorage.setItem("registrationSuccess", "true");
      router.push("/login");
    } catch (err) {
      setErrorMessage(
        "Une erreur s'est produite lors de la création de l'utilisateur",
      );
      console.error("Error : " + err);
    }
  };

  const eyeIcon = showPassword ? <HiEyeOff /> : <HiEye />;

  return (
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
              Créer un compte
            </h1>
          </div>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Nom d&apos;utilisateur
              </label>
              <input
                type="text"
                {...register("username", {
                  required: "Nom d'utilisateur est requis",
                  pattern: {
                    value: /^[a-zA-Z0-9-_]+$/,
                    message:
                      "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres et seuls les (-) et (_) sont acceptés",
                  },
                })}
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Votre nom d'utilisateur"
              />
              {errors.username && (
                <div
                  className="relative mt-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                  role="alert"
                >
                  <strong className="font-bold">Erreur: </strong>
                  <span className="block sm:inline">
                    {errors.username.message}
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                E-mail
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "E-mail est requis",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Veuillez saisir une adresse e-mail valide",
                  },
                })}
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="name@domain.com"
              />
              {errors.email && (
                <div
                  className="relative mt-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                  role="alert"
                >
                  <strong className="font-bold">Erreur: </strong>
                  <span className="block sm:inline">
                    {errors.email.message}
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Mot de passe est requis",
                  })}
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
              {errors.password && (
                <div
                  className="relative mt-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                  role="alert"
                >
                  <strong className="font-bold">Erreur: </strong>
                  <span className="block sm:inline">
                    {errors.password.message}
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Confirmez le mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirmation de mot de passe est requise",
                  })}
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                />
              </div>
              {errors.confirmPassword && (
                <div
                  className="relative mt-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                  role="alert"
                >
                  <strong className="font-bold">Erreur: </strong>
                  <span className="block sm:inline">
                    {errors.confirmPassword.message}
                  </span>
                </div>
              )}
            </div>
            {errorMessage && (
              <div
                className="relative mt-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                role="alert"
              >
                <strong className="font-bold">Erreur: </strong>
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            )}
            {mutationError && (
              <div
                className="relative mt-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
                role="alert"
              >
                <strong className="font-bold">Erreur: </strong>
                <span className="block sm:inline">{mutationError.message}</span>
              </div>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              disabled={loading}
            >
              S&apos;enregistrer
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Vous avez déjà un compte ?{" "}
              <Link
                href="/login"
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
