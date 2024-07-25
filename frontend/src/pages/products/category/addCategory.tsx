import { useMutation, useQuery } from "@apollo/client";
import Button from "components/Button";
import { ADD_CATEGORY } from "lib/graphql/mutations";
import { WHO_AM_I } from "lib/graphql/queries";
import { useForm } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import { toast } from "react-toastify";
import { User } from "types/user";
import { isAdmin } from "utils/isAdmin";
import styles from "../../../styles/pages/ProductsAddPage.module.scss";

type InputCreateCategory = {
  name: string;
};

const CategoryAddPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputCreateCategory>();

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery<{ whoAmI: User }>(WHO_AM_I);

  const [createNewCategory] = useMutation(ADD_CATEGORY);

  const user = userData?.whoAmI;
  const isUserAdmin = user ? isAdmin(user) : false;

  if (!isUserAdmin) {
    return (
      <div className="w-fit rounded-lg	border-2 border-red-500 p-4">
        <p className="flex items-center text-lg">
          <CiWarning className="mr-1 text-lg text-red-500" />
          Accès refusé. Vous n&apos;avez pas la permission de voir cette page.
        </p>
      </div>
    );
  }

  const onSubmit = async (formData: InputCreateCategory) => {
    try {
      await createNewCategory({
        variables: {
          infos: formData,
        },
      });
      reset();
      toast.success("Catégorie ajoutée avec succès !");
    } catch (err) {
      console.error("Error creating category:", err);
      toast.error("Erreur lors de la création de la catégorie");
    }
  };

  return (
    <main className={styles.productsAddPage}>
      <h3 className="mb-6 flex items-center justify-center text-3xl">
        Ajouter une nouvelle catégorie
      </h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nom de la catégorie: <br />
          <input
            className="text-field"
            {...register("name", {
              required: "Le nom de la catégorie est obligatoire",
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </label>
        <br />
        <Button type="submit">Créer</Button>
      </form>
    </main>
  );
};

export default CategoryAddPage;
