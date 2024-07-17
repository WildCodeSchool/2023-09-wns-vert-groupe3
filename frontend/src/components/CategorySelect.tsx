import { useQuery } from "@apollo/client";
import * as Select from "@radix-ui/react-select";
import { GET_ALL_CATEGORIES } from "lib/graphql/queries";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectProps {
  selectedCategoryId?: string;
  selectedCategoryName?: string;
  onCategoryChange: (categoryId: string, categoryName: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategoryId,
  selectedCategoryName,
  onCategoryChange,
}) => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_CATEGORIES);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    refetch();
  });

  const handleSelectChange = (categoryId: string, categoryName: string) => {
    onCategoryChange(categoryId, categoryName);
  };

  if (loading)
    return <p className="text-black">Chargement des catégories...</p>;
  if (error)
    return (
      <p className="text-black">Erreur lors du chargement des catégories</p>
    );

  const categories: Category[] = data?.getAllCategories || [];

  return (
    <Select.Root
      value={selectedCategoryId}
      onValueChange={(categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        if (category) {
          handleSelectChange(category.id, category.name);
        }
      }}
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <Select.Trigger
        className="inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        aria-label="Sélectionnez une catégorie"
      >
        <Select.Value
          className="text-black"
          placeholder="Sélectionnez une catégorie"
        >
          {selectedCategoryName || "Sélectionnez une catégorie"}
        </Select.Value>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-black ${isOpen ? "-rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          style={{ transition: "transform 0.3s ease-out" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 9l3 3 3-3"
          />
        </svg>
      </Select.Trigger>
      <Select.Content className="max-h-60 w-64 overflow-y-auto rounded-md bg-white shadow-md">
        <Select.Viewport className="p-2">
          {categories.map((category) => (
            <Select.Item
              key={category.id}
              value={category.id}
              className="cursor-pointer px-4 py-2 text-sm text-black hover:bg-gray-100"
            >
              {category.name}
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
};

export default CategorySelect;
