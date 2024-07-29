import { CiWarning } from "react-icons/ci";

const BadAuthorization = () => {
  return (
    <div className="w-fit rounded-lg	border-2 border-red-500 p-4">
      <p className="flex items-center text-lg">
        <CiWarning className="mr-1 text-lg text-red-500" />
        Accès refusé. Vous n&apos;avez pas la permission de voir cette page.
      </p>
    </div>
  );
};

export default BadAuthorization;
