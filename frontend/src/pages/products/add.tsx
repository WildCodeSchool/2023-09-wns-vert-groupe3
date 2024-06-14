import { useMutation } from "@apollo/client";
import axios from "axios";
import Button from "components/Button";
import CategorySelect from "components/CategorySelect";
import ImageUploader from "components/ImageUploader";
import LoadingProgress from "components/ui/LoadingProgress";
import { ADD_PRODUCT } from "lib/graphql/mutations";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InputCreateProduct } from "types/inputCreateProduct";
import styles from "../../styles/pages/ProductsAddPage.module.scss";

const ProductsAddPage = () => {
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const { register, handleSubmit, reset, setValue } =
    useForm<InputCreateProduct>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");

  const handleCategoryChange = (categoryId: string, categoryName: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
  };

  const [createNewProduct, { loading, error }] = useMutation(ADD_PRODUCT);

  if (loading) return <LoadingProgress />;
  if (error) return <p>Error: {error.message}</p>;

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post(
          "http://localhost:8000/upload",
          formData,
        );
        const newImageUrl = `http://localhost:8000${response.data.filePath}`;
        setImageURLs((prevUrls) => [...prevUrls, newImageUrl]);
      } catch (err) {
        console.error("Error uploading image:", err);
        toast.error("Erreur lors du téléchargement de l'image");
      }
    }
  };

  const onSubmit = async (formData: InputCreateProduct) => {
    try {
      formData.category = parseInt(selectedCategoryId, 10);
      setValue("category", formData.category);
      formData.price_daily = parseFloat(formData.price_daily.toString());
      formData.price_fixed = parseFloat(formData.price_fixed.toString());
      formData.quantity = parseInt(formData.quantity.toString(), 10);
      formData.category = parseInt(selectedCategoryId, 10);

      const variables = {
        ...formData,
        price_daily: formData.price_daily
          ? parseFloat(formData.price_daily.toFixed(2))
          : 0,
        price_fixed: formData.price_fixed
          ? parseFloat(formData.price_fixed.toFixed(2))
          : 0,
        quantity: formData.quantity,
        category: formData.category,
        picture: imageURLs.map((url) => `http://localhost:8000${url}`),
      };

      console.log("Variables envoyées pour la création du produit:", variables);

      await createNewProduct({
        variables: {
          infos: variables,
        },
      });

      toast.success("Produit ajouté avec succès !");
      reset();
      setSelectedCategoryId("");
      setSelectedCategoryName("");
      setImageURLs([]);
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error("Erreur lors de la création du produit");
    }
  };

  return (
    <main className={styles.productsAddPage}>
      <h3 className="mb-4 flex items-center justify-center text-3xl">
        Ajouter un nouveau produit
      </h3>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
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
            <input
              className="text-field"
              {...register("price_fixed")}
              type="number"
              step="0.01"
            />
          </label>
          <label>
            Prix journalier: <br />
            <input
              className="text-field"
              {...register("price_daily")}
              type="number"
              step="0.01"
            />
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
          Catégorie: <br />
          <CategorySelect
            selectedCategoryId={selectedCategoryId}
            selectedCategoryName={selectedCategoryName}
            onCategoryChange={handleCategoryChange}
          />
        </label>
        <br />
        <label>
          Ajouter des images: <br />
          <ImageUploader
            setImageURL={setImageURLs}
            onChange={handleImageChange}
          />
        </label>
        {imageURLs.map((url, index) => (
          <div key={index}>
            {/* <img src={url} alt={`uploadedImg-${index}`} /> */}
          </div>
        ))}
        <br />
        <Button type="submit">Créer</Button>
      </form>
    </main>
  );
};

export default ProductsAddPage;
