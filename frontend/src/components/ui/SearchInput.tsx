import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS_BY_KEYWORD } from "lib/graphql/queries";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

const SearchInput = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { data, loading, error, refetch } = useQuery(
    GET_ALL_PRODUCTS_BY_KEYWORD,
    {
      variables: { keyword: searchValue },
      skip: !searchActive || !searchValue,
    },
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (event.target.value) {
      refetch();
    }
  };

  const toggleSearch = () => {
    setSearchActive((prev) => !prev);
    if (!searchActive) {
      setSearchValue("");
    }
  };

  useEffect(() => {
    if (!searchActive) {
      setSearchValue("");
    }
  }, [searchActive]);

  const productsByKeyword = data?.getAllProductsByKeyword || [];

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder={searchActive ? "Rechercher..." : ""}
        value={searchActive ? searchValue : ""}
        onChange={handleInputChange}
        readOnly={!searchActive}
        className={`border text-black transition-all duration-300 focus:border-blue-500 focus:outline-none ${
          searchActive ? "w-60 pl-8 pr-7" : "w-9 cursor-pointer"
        } overflow-hidden rounded-full`}
        style={{
          borderRadius: "10px",
          borderColor: "#5461fc",
          borderWidth: "2px",
        }}
      />
      <div
        className="absolute inset-y-0 left-0 flex items-center pl-2.5"
        onClick={toggleSearch}
      >
        <IoMdSearch className="cursor-pointer stroke-2 text-black" />
      </div>
      {searchActive && (
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
          onClick={() => {
            setSearchActive(false);
            setSearchValue("");
          }}
        >
          <FaTimes className="cursor-pointer text-black" />
        </div>
      )}
      {searchActive && searchValue && (
        <div className="absolute top-full z-50 mt-2 w-60 rounded-md border border-gray-300 bg-white shadow-lg">
          {loading ? (
            <div className="p-2">Loading...</div>
          ) : error ? (
            <div className="p-2 text-red-500">Error: {error.message}</div>
          ) : productsByKeyword.length > 0 ? (
            <ul>
              {productsByKeyword.map((product: any) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  onClick={toggleSearch}
                >
                  <li className="flex cursor-pointer items-center justify-start p-2 text-black hover:bg-gray-100">
                    <img
                      src={product.picture[0]}
                      alt={"Image de " + product.name}
                      className="mr-6 h-12 w-12 rounded-md"
                    />
                    {product.name}
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="text-black-500 bg-red-500 p-2">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
