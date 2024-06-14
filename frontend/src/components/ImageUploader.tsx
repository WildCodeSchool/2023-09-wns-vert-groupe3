import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { IoIosCheckboxOutline } from "react-icons/io";

type ImageUploaderProps = {
  setImageURL: (urls: string[]) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  setImageURL,
  onChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [localImageURL, setLocalImageURL] = useState<string[]>([]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    if (selectedFiles.length > 9) {
      alert("Vous ne pouvez pas sélectionner plus de 9 fichiers.");
      return;
    }

    const selectedFilesArray = Array.from(selectedFiles).slice(0, 9);
    setFiles(selectedFilesArray);

    const selectedFilesPreview = selectedFilesArray.map((file) =>
      URL.createObjectURL(file),
    );
    setPreviewImages(selectedFilesPreview);
  };

  const handleValidateButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Sélectionnez au moins un fichier à télécharger.");
      return;
    }

    if (files.length > 9) {
      alert("Vous ne pouvez pas télécharger plus de 9 fichiers à la fois.");
      return;
    }

    const urlPost = "http://localhost:8000/upload";
    try {
      const uploadPromises = files.map((singleFile) => {
        const formData = new FormData();
        formData.append("file", singleFile, singleFile.name);
        return axios.post(urlPost, formData);
      });

      const responses = await Promise.all(uploadPromises);
      const filenames = responses.map(
        (res: AxiosResponse) => res.data.filename,
      );

      setLocalImageURL(filenames);
      setImageURL(filenames);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="my-4">
      <form className="flex items-center justify-between gap-2">
        <input
          multiple={true}
          accept=".png, .jpeg, .jpg"
          type="file"
          onChange={handleFileInputChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="grow cursor-pointer items-center gap-2 rounded-sm bg-blue-600 px-3 py-2 text-center text-white"
        >
          <span>Choisir des images</span>
        </label>

        <button
          type="button"
          onClick={handleValidateButtonClick}
          className="flex grow items-center gap-1 rounded-sm bg-green-600 px-3 py-2 text-center text-white"
        >
          <IoIosCheckboxOutline size={20} />
          <span>Valider la sélection</span>
        </button>
      </form>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {previewImages.map((previewUrl, index) => (
          <div
            key={index}
            className={`relative ${
              index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
            }`}
          >
            <img
              src={previewUrl}
              alt={`Preview-${index}`}
              className={`h-${index === 0 ? "300" : "50"} w-${
                index === 0 ? "300" : "50"
              } rounded object-cover`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
