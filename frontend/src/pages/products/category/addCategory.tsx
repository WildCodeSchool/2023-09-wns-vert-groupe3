import { useForm } from "react-hook-form";
import { ADD_CATEGORY } from "lib/graphql/mutations";
import styles from "../../../styles/pages/ProductsAddPage.module.scss";
import Button from "components/Button";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

type InputCreateCategory = {
    name: string;
};

const CategoryAddPage = () => {
    const { register, handleSubmit, reset } = useForm<InputCreateCategory>();

    const [createNewCategory] = useMutation(ADD_CATEGORY);

    const onSubmit = async (formData: InputCreateCategory) => {
        try{
            await createNewCategory({
                variables: {
                    infos: formData
                }
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
            <input className="text-field" {...register("name")} />
          </label>
          <br />
          <Button type="submit">
            Créer
          </Button>
        </form>
      </main>
    );
  };

export default CategoryAddPage;