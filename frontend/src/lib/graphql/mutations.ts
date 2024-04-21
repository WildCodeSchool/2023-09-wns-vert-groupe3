import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation Mutation($infos: InputCreateProduct!) {
    addProduct(infos: $infos) {
      id
      name
      description
      picture
      price
      quantity
      created_at
      updated_at
      category {
        name
        id
      }
    }
  }
`;
