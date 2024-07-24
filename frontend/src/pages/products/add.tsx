import { useMutation } from "@apollo/client";
import axios from "axios";
import Button from "components/Button";
import CategorySelect from "components/CategorySelect";
import ImageUploader from "components/ImageUploader";
import LoadingProgress from "components/ui/LoadingProgress";
import { ADD_PRODUCT } from "lib/graphql/mutations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import { toast } from "react-toastify";
import { InputCreateProduct } from "types/inputCreateProduct";
import styles from "../../styles/pages/ProductsAddPage.module.scss";

const ProductsAddPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InputCreateProduct>();
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
      const imageUrls = uploadedImages.map((filename) => {
        console.log("filename : ", filename);
        return `http://localhost:8000${filename}`;
      });

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
          <input
            className={`text-field ${errors.name ? "border-red-500" : ""}  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="mt-1 flex items-center text-red-500">
              <CiWarning className="mr-1 text-xl" /> Ce champ est requis.
            </p>
          )}
        </label>
        <br />
        <label>
          Description courte: <br />
          <input
            className={`text-field  ${errors.description_short ? "border-red-500" : ""}  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("description_short", { required: true })}
          />
          {errors.description_short && (
            <p className="mt-1 flex items-center text-red-500">
              <CiWarning className="mr-1 text-xl" /> Ce champ est requis.
            </p>
          )}
        </label>
        <br />
        <label>
          Description longue: <br />
          <textarea
            className={`w-full border p-3 ${errors.description_long ? "border-red-500" : "border-gray-300"} max-h-72 min-h-14 resize-y rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("description_long", { required: true })}
          />
          {errors.description_long && (
            <p className="mt-2 flex items-center text-red-500">
              <CiWarning className="mr-1 text-xl" /> Ce champ est requis.
            </p>
          )}
        </label>
        <br />
        <div className="flex justify-between">
          <label>
            Prix fix: <br />
            <input
              className={`text-field ${errors.price_fixed ? "border-red-500" : ""}  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("price_fixed", { required: true })}
              type="number"
              min={0}
            />
            {errors.price_fixed && (
              <p className="mt-1 flex items-center text-red-500">
                <CiWarning className="mr-1 text-xl" /> Ce champ est requis.
              </p>
            )}
          </label>
          <label>
            Prix journalier: <br />
            <input
              className="text-field  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("price_daily")}
              type="number"
              min={0}
            />
          </label>
        </div>
        <br />
        <label>
          Quantité: <br />
          <input
            className={`text-field ${errors.quantity ? "border-red-500" : ""}  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            {...register("quantity", { required: true })}
            type="number"
            min={0}
          />
          {errors.quantity && (
            <p className="mt-1 flex items-center text-red-500">
              <CiWarning className="mr-1 text-xl" /> Ce champ est requis.
            </p>
          )}
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
