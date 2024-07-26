import { useMutation, useQuery } from "@apollo/client";
import CategoryLink from "components/CategoryLink";
import DeleteModal from "components/modal/DeleteModal";
import LoadingProgress from "components/ui/LoadingProgress";
import { useUserDatesResearch } from "contexts/UserDatesResearchContext";
import { DELETE_PRODUCT, UPDATE_PRODUCT } from "lib/graphql/mutations";
import { GET_PRODUCTS, ProductType } from "lib/graphql/queries";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { convertToCurrency } from "utils/currency";
import { isProductUnavailableAtDates } from "utils/date";

const ProductsList = () => {
  const { dates: userRequestedRentDates } = useUserDatesResearch();

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price_daily: 0,
    quantity: 0,
  });
  const router = useRouter();

  const [
    deleteProduct,
    { loading: deleteProductLoading, error: deleteProductError },
  ] = useMutation(DELETE_PRODUCT);

  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const handleDelete = async (productId: string) => {
    if (deleteProductLoading) return <LoadingProgress />;
    if (deleteProductError) return console.log(deleteProductError.message);

    const productIdNumber = parseFloat(productId);

    try {
      await deleteProduct({
        variables: {
          productId: productIdNumber,
        },
        refetchQueries: [
          {
            query: GET_PRODUCTS,
          },
        ],
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProduct({
        variables: {
          infos: {
            name: editForm.name,
            price_daily: parseFloat(editForm.price_daily.toString()),
            quantity: parseInt(editForm.quantity.toString()),
          },
          updateProductId: parseInt(editingArticle.id),
        },
        refetchQueries: [{ query: GET_PRODUCTS }],
      });
      console.log("Product updated!");
      setEditingArticle(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <LoadingProgress />;
  if (error) return <p>Error: {error.message}</p>;

  // console.log('data :', data);
  const articles: ProductType[] = data.getAllproducts;
  console.log(articles);

  const handleEdit = (article: any) => {
    setEditingArticle(article);
    setEditForm({
      name: article.name,
      price_daily: article.price_daily,
      quantity: article.quantity,
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleButtonClick = () => {
    router.push(`/products/add`);
  };

  const openModalDelete = (article: any) => {
    setSelectedArticle(article);
    setShowModalDelete(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-hightcontrast">
            Gestion de tous les articles
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => handleButtonClick()}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Ajouter un article
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full  table-fixed divide-y divide-neutral-300">
                <thead className="bg-neutral-200">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-hightcontrast sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-lg font-semibold text-hightcontrast"
                    >
                      Catégorie
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-lg font-semibold text-hightcontrast"
                    >
                      Prix à l&apos;unité
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-lg font-semibold text-hightcontrast"
                    >
                      Disponibilité
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-lg font-semibold text-hightcontrast"
                    >
                      Quantité
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-300 bg-neutral-200">
                  {articles.map((article: ProductType) => (
                    <tr key={article.id}>
                      <td className="name-cell whitespace-nowrap py-4 pl-4 pr-3 text-lg sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0">
                            <img
                              className=" h-16 w-16 rounded-full"
                              width={100}
                              height={100}
                              src={article.picture[0]}
                              alt={article.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-hightcontrast">
                              {article.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-lg">
                        <span className="inline-flex rounded-full p-4 px-2 text-lg font-bold leading-5">
                          {article.category?.name && (
                            <div
                              className={` w-max rounded px-2 py-1 text-sm`}
                            >
                              {article.category.name}
                            </div>
                          )}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-lg">
                        <p>
                          {
                            convertToCurrency(article.price_daily).in("EUR")
                              .valueWithSymbol
                          }
                        </p>
                      </td>
                      {false ? (
                        <td className="whitespace-nowrap px-3 py-4 text-lg text-red-600">
                          Indisponible
                        </td>
                      ) : (
                        <td className="whitespace-nowrap px-3 py-4 text-lg">
                          Disponible
                        </td>
                      )}
                      <td className="whitespace-nowrap px-3 py-4 text-lg">
                        <p>{article.quantity}</p>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-lg font-medium sm:pr-6">
                        <div>
                          <a
                            href="#"
                            className="font-semibold text-indigo-600 hover:text-indigo-900"
                          >
                            Editer
                            <span className="sr-only">, {article.name}</span>
                          </a>
                        </div>
                        <div
                          onClick={() => openModalDelete(article)}
                          className="cursor-pointer"
                        >
                          <a className="font-semibold text-indigo-600 hover:text-red-600">
                            Supprimer
                            <span className="sr-only">, {article.name}</span>
                          </a>
                        </div>
                      </td>
                      {showModalDelete && (
                        <DeleteModal
                          setShowModalDelete={setShowModalDelete}
                          handleDelete={handleDelete}
                          selectedArticle={selectedArticle}
                        />
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
