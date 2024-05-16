const getCategoryColor = (categoryName: string) => {

   switch (categoryName) {
      case "Ski":
         return "bg-gradient-to-br from-sky-500 via-sky-500 to-indigo-500 text-white";
      case "Plongée":
         return "bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-500 text-white";
      case "Randonnée":
         return "bg-gradient-to-br from-green-600 via-green-600 to-indigo-500 text-white";
      case "Escalade":
         return "bg-gradient-to-br from-amber-800 via-amber-800 to-indigo-500 text-white";
      case "Camping":
         return "bg-gradient-to-br from-yellow-600 via-yellow-600 to-indigo-500 text-white";
      case "Rafting":
         return "bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-500 text-white";
      case "Pêche":
         return "bg-slate-500 text-white";
      default:
         return "bg-slate-500";
   }
};

export default getCategoryColor;