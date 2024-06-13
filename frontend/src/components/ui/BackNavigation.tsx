import Link from "next/link";

interface BackNavigationProps {
  navigation: string;
}

const BackNavigation = ({ navigation }: BackNavigationProps) => {
  return (
    <div className="mb-4 flex w-fit">
      <Link
        href={navigation}
        className="flex w-full items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <svg
          className="h-5 w-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>Retour</span>
      </Link>
    </div>
  );
};

export default BackNavigation;
