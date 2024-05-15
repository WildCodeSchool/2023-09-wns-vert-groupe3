import { useQuery } from '@apollo/client';
import DeleteModal from 'components/modal/DeleteModal';
import LoadingProgress from 'components/ui/LoadingProgress';
import { PRODUCT_UNAVAILABLE_DATES, USER_REQUESTED_RENT_DATES } from 'data/fakeData';
import { GET_PRODUCTS } from 'lib/graphql/queries';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import getCategoryColor from 'utils/categoryColors';
import { isDateRangeOverlap } from 'utils/date';

const productslist = () => {
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [selectedArticle, setSelectedArticle] = useState(null);
   const router = useRouter();

   const { data, loading, error } = useQuery(GET_PRODUCTS);
   
   if (loading) return <LoadingProgress />;
   if (error) return <p>Error: {error.message}</p>;
   
   console.log('data :', data);

   const articles = data.getAllproducts

   console.log(articles);
   
   
   const fakeArticles = [
      {
         id: 1,
         name: 'Sac de voyage',
         category: 'Randonnée',
         quantity: '5',
         price: '179,00€',
         picture:
            'https://www.trekmag.com/media/Conseils/s-b-vonlanthen-D75_5tWZDQ4-unsplash.jpg',
      },
      {
         id: 2,
         name: 'Combinaison de plongée',
         category: 'Plongée',
         quantity: '13',
         price: '219,00€',
         picture:
            'https://boutique.boulogneplongee.fr/7492-home_default_2x/seac-masterdry-combinaison-semi-etanche-femme-taille-m-n33.jpg',
      }
   ]
   

   const isUnavailable = isDateRangeOverlap(
      USER_REQUESTED_RENT_DATES,
      PRODUCT_UNAVAILABLE_DATES,
   );

   const handleButtonClick = () => {
      router.push(`/products/add`)
   };

   const openModalDelete = (articleName: any) => {
      console.log('delete');
      setSelectedArticle(articleName)
      setShowModalDelete(true)
   }

   return (
      <div className="px-4 sm:px-6 lg:px-8">
         <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
               <h1 className="text-2xl font-semibold text-gray-900">Liste de tous les articles</h1>
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
                              {/* <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-gray-900">
                                 Quantité
                              </th> */}
                              <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-gray-900">
                                 Quantité
                              </th>
                              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                 <span className="sr-only">Edit</span>
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                           {articles.map((article :any) => (
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
                                    <span className="inline-flex rounded-full px-2 text-lg font-bold leading-5 text-green-800 p-4">
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
                                    <div onClick={() => openModalDelete(article.name)} className='cursor-pointer'>
                                       <a className="text-indigo-600 hover:text-red-600 font-semibold">
                                          Supprimer<span className="sr-only">, {article.name}</span>
                                       </a>
                                    </div>
                                 </td>
                                 {showModalDelete && selectedArticle && <DeleteModal setShowModalDelete={setShowModalDelete} nameArticle={selectedArticle}/>}
                              </tr>
                           ))}
                        </tbody>
                     </table>
                     {/* <DeleteModal /> */}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}


export default productslist