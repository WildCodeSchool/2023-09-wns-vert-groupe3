import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct($infos: InputCreateProduct!) {
    addProduct(infos: $infos) {
      description_short
      description_long
      name
      price_fixed
      price_daily
      picture
      stock
      category {
        id
        name
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation Mutation($infos: InputCreateCategory!) {
    addCategory(infos: $infos) {
      id
      name
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation Mutation($productId: Float!) {
    deleteProduct(productId: $productId)
  }
`;

export const CREATE_USER = gql`
   mutation Mutation($newUserData: InputUserCreate!) {
   register(newUserData: $newUserData)
   }
`;

export const UPDATE_PRODUCT = gql`
  mutation Mutation($infos: InputUpdateProduct!, $updateProductId: Float!) {
    updateProduct(infos: $infos, id: $updateProductId) {
      name
      price_daily
      quantity
    }
  }
`;
