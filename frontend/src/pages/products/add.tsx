import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "lib/graphql/mutations";
import { useForm } from "react-hook-form";
import styles from "../../styles/pages/ProductsAddPage.module.scss";

type InputCreateProduct = {
  name: string;
  description: string;
  picture: string;
  price: number;
  quantity: number;
  category: {
    id: number;
    name: string;
  };
};

const ProductsAddPage = () => {
  const { register, handleSubmit, setValue } = useForm<InputCreateProduct>();

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
      await createNewProduct({
        variables: {
          adData: {
            name: formData.name,
            description: formData.description,
            picture: formData.picture,
            price: Number.parseInt(formData.price.toString()),
            quantity: Number.parseInt(formData.quantity.toString()),
            category: formData.category,
          },
        },
      });
    } catch (err) {
      console.error("Error creating product:", err);
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

        <br />
        <br />
        <button className="button button-primary" type="submit">
          Créer
        </button>
      </form>
    </main>
  );
};

export default ProductsAddPage;
