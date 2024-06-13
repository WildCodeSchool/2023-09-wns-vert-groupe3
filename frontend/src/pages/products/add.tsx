import { useMutation } from "@apollo/client";
import CategorySelect from "components/CategorySelect";
import { ADD_PRODUCT } from "lib/graphql/mutations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/pages/ProductsAddPage.module.scss";
import { toast } from "react-toastify";
import Button from "components/Button";
import { useRouter } from "next/router";

type InputCreateProduct = {
  name: string;
  description_short: string;
  description_long: string;
  picture: string;
  price_fixed: string;
  price_daily: string;
  quantity: string;
  category: string;
};

const ProductsAddPage = () => {
   const router = useRouter()
   if(localStorage.getItem("jwt") === null) {
      router.push ("/login")
   }
  const { register, handleSubmit, setValue, reset } = useForm<InputCreateProduct>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");

  const handleCategoryChange = (categoryId: string, categoryName: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
  };

  const [
    createNewProduct,
    { loading: createProductLoading, error: createProductError },
  ] = useMutation(ADD_PRODUCT);

  const onSubmit = async (formData: InputCreateProduct) => {
    console.log("SUBMITTING", formData)

    try {
      formData.category = selectedCategoryId;
      setValue("category", formData.category);

      const variables = {
        ...formData,
        price_daily: parseFloat(formData.price_daily),
        price_fixed: parseFloat(formData.price_fixed),
        quantity: parseInt(formData.quantity, 10),
        category: parseInt(formData.category, 10),
      }

      await createNewProduct({
        variables: {
          infos: variables,
        },
      });

      toast.success("Produit ajouté avec succès !");
      reset();
      setSelectedCategoryId("");
      setSelectedCategoryName("");
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error("Erreur lors de la création du produit");
    }
  };

  return (
    <main className={styles.productsAddPage}>
      <h3 className="mb-6 flex items-center justify-center text-3xl">
        Ajouter un nouveau produit
      </h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} method="POST">
        <label>
          Nom de l&apos;annonce: <br />
          <input className="text-field" {...register("name")} />
        </label>
        <br />
        <label>
          Description courte: <br />
          <input className="text-field" {...register("description_long")} />
        </label>
        <br />
        <label>
          Description longue: <br />
          <input className="text-field" {...register("description_short")} />
        </label>
        <br />
        <div className="flex gap-4">
          <label>
            Prix fix: <br />
            <input className="text-field" {...register("price_fixed")} type="number" />
          </label>
          <label>
            Prix journalier: <br />
            <input className="text-field" {...register("price_daily")} type="number" />
          </label>
        </div>
        <br />
        <label>
          Quantité: <br />
          <input
            className="text-field"
            {...register("quantity")}
            type="number"
          />
        </label>
        <br />
        <label>
          Ajouter une image: <br />
          <input className="text-field" {...register("picture")} />
        </label>
        <br />

        <label>
          Catégorie: <br />
          <CategorySelect
            selectedCategoryId={selectedCategoryId}
            selectedCategoryName={selectedCategoryName}
            onCategoryChange={handleCategoryChange}
          />
        </label>
        <br />

        <Button type="submit">
          Créer
        </Button>
      </form>
    </main>
  );
};

export default ProductsAddPage;