import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetAllproducts {
    getAllproducts {
      id
      name
      description
      picture
      price
      quantity
      created_at
      updated_at
      category {
        id
        name
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query Query {
    getAllCategories {
      id
      name
      description
      picture
      price
      quantity
      created_at
      updated_at
      category {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_ID = gql`
  query Query($categoryId: Float!) {
    getProductsByCategoryId(categoryId: $categoryId) {
      id
      name
      description
      picture
      price
      quantity
      created_at
      updated_at
      category {
        id
        name
      }
    }
  }
`;
