import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct($infos: InputCreateProduct!) {
  addProduct(infos: $infos) {
    description
    name
    price
    picture
    quantity
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