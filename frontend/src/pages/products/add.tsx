import { useMutation } from "@apollo/client";
import axios from "axios";
import Button from "components/Button";
import CategorySelect from "components/CategorySelect";
import ImageUploader from "components/ImageUploader";
import LoadingProgress from "components/ui/LoadingProgress";
import { ADD_PRODUCT } from "lib/graphql/mutations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InputCreateProduct } from "types/inputCreateProduct";
import styles from "../../styles/pages/ProductsAddPage.module.scss";

const ProductsAddPage = () => {
  const [files, setFiles] = useState<File[]>([]);
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

  const handleImageChange = (files: File[]) => {
    setFiles(files);
  };

  const uploadImages = async () => {
    const urlPost = "http://localhost:8000/upload";
    const uploadPromises = files.map((singleFile) => {
      const formData = new FormData();
      formData.append("file", singleFile, singleFile.name);
      return axios.post(urlPost, formData);
    });

    try {
      const responses = await Promise.all(uploadPromises);
      console.log("Server responses:", responses);
      const filenames = responses.map((res) => res.data.filename);
      return filenames;
    } catch (err) {
      console.error("Error uploading images:", err);
      throw err;
    }
  };

  const onSubmit = async (formData: InputCreateProduct) => {
    try {
      formData.category = parseInt(selectedCategoryId, 10);
      setValue("category", formData.category);
      formData.price_daily = parseFloat(formData.price_daily.toString());
      formData.price_fixed = parseFloat(formData.price_fixed.toString());
      formData.quantity = parseInt(formData.quantity.toString(), 10);

      const uploadedImages = await uploadImages();
      const imageUrls = uploadedImages.map(
        (filename) => `http://localhost:8000${filename}`,
      );

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
        picture: imageUrls,
      };

      console.log("Données envoyés : ", variables);

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
            />
          </label>
          <label>
            Prix journalier: <br />
            <input
              className="text-field"
              {...register("price_daily")}
              type="number"
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
          <ImageUploader setFiles={handleImageChange} />
        </label>
        <br />
        <Button type="submit">Créer</Button>
      </form>
    </main>
  );
};

export default ProductsAddPage;
