import { useQuery } from "@apollo/client";
import * as Select from "@radix-ui/react-select";
import { GET_ALL_CATEGORIES } from "lib/graphql/queries";
import { useState } from "react";

const CategoriesFilter = () => {
  const { loading, error, data } = useQuery(GET_ALL_CATEGORIES);
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | undefined
  >(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (name: string) => {
    setSelectedCategoryName(name);
  };

  if (loading)
    return <p className="text-black">Chargement des articles</p>;
  if (error)
    return (
      <p className="text-black">Erreur lors du chargement des articles</p>
    );

  const categories = data?.getAllCategories || [];

  return (
    <div className="py-4 z-20 relative">
      <h1 className="mb-4 text-2xl font-semibold">Filtrer les articles</h1>
      <Select.Root
        value={selectedCategoryName}
        onValueChange={handleSelectChange}
        open={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <Select.Trigger
          className="inline-flex w-64 items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          aria-label="Sélectionnez une catégorie"
        >
          <Select.Value
            className="text-black"
            placeholder="Sélectionnez une catégorie"
          >
            {
              categories.find(
                (category: any) => category.name === selectedCategoryName,
              )?.name
            }
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
          <Select.Viewport className="p-2 absolute">
            {categories.map((category: any) => (
              <Select.Item
                key={category.id}
                value={category.name}
                className="cursor-pointer px-4 py-2 text-sm text-black hover:bg-gray-100"
              >
                {category.name}
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default CategoriesFilter;
