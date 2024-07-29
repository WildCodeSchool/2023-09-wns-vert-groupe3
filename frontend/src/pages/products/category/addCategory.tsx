import { useMutation } from "@apollo/client";
import Button from "components/Button";
import BadAuthorization from "components/ui/BadAuthorization";
import { ADD_CATEGORY } from "lib/graphql/mutations";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "../../../styles/pages/ProductsAddPage.module.scss";
import { useContext } from "react";
import { UserContext } from "contexts/UserContext";

type InputCreateCategory = {
  name: string;
};

const CategoryAddPage = () => {
   const authInfo = useContext(UserContext)
   const userRole = authInfo.role

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputCreateCategory>();


  const [createNewCategory] = useMutation(ADD_CATEGORY);

  if (userRole != "admin") {
    return <BadAuthorization />;
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
