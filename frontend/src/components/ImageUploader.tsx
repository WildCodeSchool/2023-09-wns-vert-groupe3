import React, { useState } from "react";

type ImageUploaderProps = {
  setFiles: (files: File[]) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ setFiles }) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="my-4">
      <div className="flex items-center justify-between gap-2">
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
      </div>
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
