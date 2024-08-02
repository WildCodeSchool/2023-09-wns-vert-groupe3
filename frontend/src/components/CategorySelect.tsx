import { useQuery } from "@apollo/client";
import * as Select from "@radix-ui/react-select";
import { GET_ALL_CATEGORIES } from "lib/graphql/queries";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";

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
   }, [refetch]);

   const handleSelectChange = (categoryId: string) => {
      const category = categories.find((cat) => cat.id === categoryId);
      if (category) {
         onCategoryChange(category.id, category.name);
      }
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
         onValueChange={handleSelectChange}
         open={isOpen}
         onOpenChange={setIsOpen}
      >
         <Select.Trigger
            className="inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
               align="start"
               style={{ width: '28.5rem' }}
            >
               <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-white text-black">
                  <RxChevronUp />
               </Select.ScrollUpButton>
               <Select.Viewport className="p-2">
                  {categories.map((category) => (
                     <SelectItem key={category.id} value={category.id}>
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
   );
};

export const SelectItem = React.forwardRef<HTMLDivElement, Select.SelectItemProps>(
   ({ children, ...props }, forwardedRef) => (
      <Select.Item
         className="relative flex h-[25px] cursor-pointer select-none items-center rounded-sm pl-[25px] pr-[35px] text-[13px] leading-none text-black data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-300 data-[disabled]:text-gray-500 data-[highlighted]:text-black data-[highlighted]:outline-none z-20"
         {...props}
         ref={forwardedRef}
      >
         <Select.ItemText>{children}</Select.ItemText>
         <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
            <FaCheck />
         </Select.ItemIndicator>
      </Select.Item>
   ),
);

SelectItem.displayName = "SelectItem";

export default CategorySelect;
