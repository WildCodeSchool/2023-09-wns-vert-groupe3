import React from 'react'
import styles from "../../../styles/pages/ProductsAddPage.module.css"
import { useForm } from 'react-hook-form'
import { InputsProducts } from '@/types/inputsProducts'

// const {
//    register,
//    handleSubmit
// } = useForm<InputsProducts>()

const ProductsAddPage = () => {
   return (
      <main className={styles.productsAddPage}>
         <div>
            <h2 className={styles.title}>Products add page !</h2>
         </div>
         <form className={styles.form}/* onSubmit={handleSubmit(onSubmit)} */>
            <label>
               Titre de l&apos;annonce: <br />
               <input className="text-field" /* {...register("title")} */ />
            </label>
            <br />
            <label>
               Prix: <br />
               <input className="text-field" /* {...register("price")}  *//>
            </label>
            <br />
            <label>
               Description: <br />
               <input className="text-field"/*  {...register("description")} */ />
            </label>
            <br />
            <label>
               Ville: <br />
               <input className="text-field" /* {...register("location")}  *//>
            </label>
            <br />
            <select /* {...register("category")} */>
               {/* {data?.allCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                     {category.name}
                  </option>
               ))} */}
            </select>
            <br />
            <br />

            <input className="button button-primary" type="submit" />
         </form>
      </main>)
}

export default ProductsAddPage