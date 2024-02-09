import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetAllproducts {
    products {
      id
      name
      price
      description
      image 
      }
  }`;