import { useMutation } from "@apollo/client";
import CategorySelect from "components/CategorySelect";
import { ADD_PRODUCT } from "lib/graphql/mutations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/pages/ProductsAddPage.module.scss";
import { toast } from "react-toastify";
import Button from "components/Button";

type InputCreateProduct = {
  name: string;
  description: string;
  picture: string;
  price: string;
  quantity: string;
  category: string;
};

const ProductsAddPage = () => {
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

  if (createProductLoading)
    return <p className="text-black">Chargement des produits...</p>;
  if (createProductError) {
    return <p className="text-black">Erreur lors de la création du produit</p>;
  }

  const onSubmit = async (formData: InputCreateProduct) => {
    try {
      formData.category = selectedCategoryId;
      setValue("category", formData.category);

      const variables = {
        ...formData,
        price: parseFloat(formData.price),
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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nom de l&apos;annonce: <br />
          <input className="text-field" {...register("name")} />
        </label>
        <br />
        <label>
          Description: <br />
          <input className="text-field" {...register("description")} />
        </label>
        <br />
        <label>
          Prix: <br />
          <input className="text-field" {...register("price")} type="number" />
        </label>
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