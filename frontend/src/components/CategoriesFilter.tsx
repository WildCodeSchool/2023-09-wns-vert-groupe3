import { useQuery } from "@apollo/client";
import * as Select from "@radix-ui/react-select";
import { SelectItem } from "components/CategorySelect";
import { GET_ALL_CATEGORIES } from "lib/graphql/queries";
import { useState } from "react";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";


interface Category {
   id: string;
   name: string;
}

interface CategoriesFilterProps {
   setSelectedCategory: (category: string | null) => void;
}

const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
   setSelectedCategory,
}) => {
   const { loading, error, data } = useQuery(GET_ALL_CATEGORIES);
   const [selectedCategoryName, setSelectedCategoryName] = useState<
      string | undefined
   >(undefined);
   const [isOpen, setIsOpen] = useState(false);

   const handleSelectChange = (name: string) => {
      setSelectedCategoryName(name);
      setSelectedCategory(name);
   };

   const handleReset = () => {
      handleSelectChange("");
   };

   if (loading) return <p className="text-black">Chargement des articles</p>;
   if (error)
      return <p className="text-black">Erreur lors du chargement des articles</p>;

   const categories: Category[] = data?.getAllCategories || [];

   return (
      <div className="relative z-20 py-4">
         <h1 className="mb-4 text-2xl font-semibold">Filtrer les articles</h1>
         <Select.Root
            value={selectedCategoryName}
            onValueChange={handleSelectChange}
            open={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
         >
            <Select.Trigger
               className="mr-4 inline-flex w-64 items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
               aria-label="Sélectionnez une catégorie"
            >
               <Select.Value placeholder="Sélectionnez une catégorie">
                  {selectedCategoryName || "Sélectionnez une catégorie"}
               </Select.Value>
               <Select.Icon className="text-black">
                  <RxChevronDown className={`h-5 w-5 ${isOpen ? "-rotate-180" : ""}`} />
               </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
               <Select.Content className="overflow-hidden rounded-md bg-white shadow-md"
                  position="popper"
                  sideOffset={0}
                  align="center"
                  style={{width: '16rem'}}
               >
                  <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-white text-black">
                     <RxChevronUp />
                  </Select.ScrollUpButton>
                  <Select.Viewport className="p-2">
                     {categories.map((category: any) => (
                        <SelectItem key={category.id} value={category.name}>
                           {category.name}
                        </SelectItem>
                     ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-white text-black">
                     <RxChevronDown />
                  </Select.ScrollDownButton>
               </Select.Content>
            </Select.Portal>
         </Select.Root>
         <button
            onClick={handleReset}
            className="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
         >
            Réinitialiser
         </button>
      </div>
   );
};

SelectItem.displayName = "SelectItem";


export default CategoriesFilter;
