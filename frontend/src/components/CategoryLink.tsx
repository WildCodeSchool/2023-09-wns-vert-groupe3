import Link from "next/link";
import React, { useState } from "react";

interface CategoryLinkProps {
  category: {
    id: number;
    name: string;
  };
}

const CategoryLink: React.FC<CategoryLinkProps> = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case "Ski":
        return "bg-gradient-to-br from-sky-500 via-sky-500 to-indigo-500";
      case "Plongée":
        return "bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-500";
      case "Randonnée":
        return "bg-gradient-to-br from-green-600 via-green-600 to-indigo-500";
      case "Escalade":
        return "bg-gradient-to-br from-amber-800 via-amber-800 to-indigo-500";
      case "Camping":
        return "bg-gradient-to-br from-yellow-600 via-yellow-600 to-indigo-500";
      case "Jetski":
        return "bg-gradient-to-br from-red-500 via-red-600 to-indigo-500";
      default:
        return "bg-slate-500";
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Link
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={`/products/category/${category.id}`}
      className={`w-max cursor-pointer rounded px-2 py-1 text-sm ${
        isHovered ? "bg-indigo-500" : getCategoryColor(category.name)
      }`}
    >
      {category.name}
    </Link>
  );
};

export default CategoryLink;
