import { useMutation, useQuery } from '@apollo/client';
// import DeleteModal from 'components/modal/DeleteModal';
import LoadingProgress from 'components/ui/LoadingProgress';
import { PRODUCT_UNAVAILABLE_DATES, USER_REQUESTED_RENT_DATES } from 'data/fakeData';
import { DELETE_PRODUCT } from 'lib/graphql/mutations';
import { GET_PRODUCTS } from 'lib/graphql/queries';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import getCategoryColor from 'utils/categoryColors';
// import { InputsProducts } from 'types/inputsProducts';
import { isDateRangeOverlap } from 'utils/date';

const productslist = () => {
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [selectedArticle, setSelectedArticle] = useState<any>(null);
   const router = useRouter();

   const [deleteProduct, { loading: deleteProductLoading, error: deleteProductError }] = useMutation(DELETE_PRODUCT);

   const handleDelete = async (productId: string) => {
      console.log("Product id : ", productId);
      
      console.log("TypeOf productid: ", typeof(productId));
      const productIdNumber = parseFloat(productId);
      // console.log("TypeOf productid !!!: ", typeof(productIdNumber));

      try {
         await deleteProduct({
            variables: {
               productId: productIdNumber
            },
            refetchQueries: [{
               query: GET_PRODUCTS
            }]
         });
         console.log('Product deleted !');
         
      } catch (error) {
         console.error('Error deleting product:', error);
      }
   };

   const { data, loading, error } = useQuery(GET_PRODUCTS);

   if (loading) return <LoadingProgress />;
   if (error) return <p>Error: {error.message}</p>;

   // console.log('data :', data);
   const articles = data.getAllproducts
   console.log(articles);

   const isUnavailable = isDateRangeOverlap(
      USER_REQUESTED_RENT_DATES,
      PRODUCT_UNAVAILABLE_DATES,
   );

   const handleButtonClick = () => {
      router.push(`/products/add`)
   };

   const openModalDelete = (article: any) => {
      setSelectedArticle(article); 
      console.log('delete');
      setShowModalDelete(true)
   }

   return (
      <div className="px-4 sm:px-6 lg:px-8">
         <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
               <h1 className="text-2xl font-semibold text-gray-900">Gestion de tous les articles</h1>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
               <button onClick={() => handleButtonClick()}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
               >
                  Ajouter un article
               </button>
            </div>
         </div>
         <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
               <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                     <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                           <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-gray-900 sm:pl-6">
                                 Name
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-gray-900">
                                 Catégorie
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-gray-900">
                                 Prix à l'unité
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-gray-900">
                                 Disponibilité
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-gray-900">
                                 Quantité
                              </th>
                              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                 <span className="sr-only">Edit</span>
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                           {articles.map((article: any) => (
                              <tr key={article.id}>
                                 <td className="whitespace-nowrap py-4 pl-4 pr-3 text-lg sm:pl-6 name-cell" >
                                    <div className="flex items-center">
                                       <div className="h-16 w-16 flex-shrink-0">
                                          <img className=" h-16 w-16 rounded-full" src={article.picture} alt="" />
                                       </div>
                                       <div className="ml-4">
                                          <div className="font-medium text-gray-900">{article.name}</div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="whitespace-nowrap px-3 py-4 text-lg">
                                    <span className="inline-flex rounded-full px-2 text-lg font-bold leading-5 p-4">
                                       {article.category.name && (
                                          <div
                                          // onClick={handleButtonClick}
                                          className={` w-max rounded px-2 py-1 text-sm ${getCategoryColor(article.category.name)}`}
                                          >
                                             {article.category.name}
                                          </div>
                                       )}
                                    </span>
                                 </td>
                                 <td className="whitespace-nowrap px-3 py-4 text-lg">
                                    <div className="text-gray-900">{article.price}</div>
                                 </td>
                                 {isUnavailable ? (
                                    <td className="whitespace-nowrap px-3 py-4 text-lg text-red-600">Indisponible</td>
                                 ) : <td className="whitespace-nowrap px-3 py-4 text-lg">Disponible</td>
                                 }
                                 <td className="whitespace-nowrap px-3 py-4 text-lg">{article.quantity}</td>
                                 <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-lg font-medium sm:pr-6">
                                    <div>
                                       <a href="#" className="text-indigo-600 hover:text-indigo-900 font-semibold">
                                          Editer<span className="sr-only">, {article.name}</span>
                                       </a>
                                    </div>
                                    <div onClick={() => openModalDelete(article)} className='cursor-pointer'>
                                       <a className="text-indigo-600 hover:text-red-600 font-semibold">
                                          Supprimer<span className="sr-only">, {article.name}</span>
                                       </a>
                                    </div>
                                 </td>
                                 
                                 {showModalDelete &&



                                    <div id="popup-modal" tabIndex={-1} className="bg-black bg-opacity-15 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                       <div className="relative p-4 w-full max-w-md max-h-full">
                                          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                             <button onClick={() => setShowModalDelete(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                             </button>
                                             <div className="p-4 md:p-5 text-center">
                                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Confirmez-vous la suppression de tous les articles "{selectedArticle?.name}" ?</h3>
                                                <button onClick={() => {
                                                   handleDelete(selectedArticle?.id);
                                                   setShowModalDelete(false)
                                                }} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                   Oui, je suis sûr
                                                </button>
                                                <button onClick={() => setShowModalDelete(false)} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Annuler</button>
                                             </div>
                                          </div>
                                       </div>
                                    </div>



                                 }
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}


export default productslist