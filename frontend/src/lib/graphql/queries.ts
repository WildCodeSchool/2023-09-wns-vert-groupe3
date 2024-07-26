import { gql } from "@apollo/client";

export type ProductType = {
  id: number;
  name?: string;
  picture: string[];
  discount: number;
  description_long: string;
  description_short: string;
  price_daily: number;
  price_fixed: number;
  stock: number;
  category?: {
    id: number;
    name: string;
  };
  rents?: {
    quantity: number;
    rent: {
      to: string;
      from: string;
    };
  }[];
  created_at: string;
  updated_at: string;
};

export const GET_PRODUCTS = gql`
  query GetAllproducts {
    getAllproducts {
      id
      name
      stock
      picture
      discount
      description_long
      description_short
      price_daily
      price_fixed
      rents {
        quantity
        rent {
          to
          from
        }
      }
      category {
        id
        name
      }
      created_at
      updated_at
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query Query($productId: Float!) {
    getProductById(productId: $productId) {
      id
      name
      stock
      picture
      discount
      description_long
      description_short
      price_daily
      price_fixed
      rents {
        quantity
        rent {
          to
          from
        }
      }
      category {
        id
        name
      }
      created_at
      updated_at
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_ID = gql`
  query Query($categoryId: Float!) {
    getProductsByCategoryId(categoryId: $categoryId) {
      id
      name
      stock
      picture
      discount
      description_long
      description_short
      price_daily
      price_fixed
      rents {
        quantity
        rent {
          to
          from
        }
      }
      category {
        id
        name
      }
      created_at
      updated_at
    }
  }
`;

export const LOGIN = gql`
  query Query($inputUserLogin: InputUserLogin!) {
    loginUser(inputUserLogin: $inputUserLogin)
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    getUserProfile {
      id
      email
      username
    }
  }
`;

export const GET_ALL_PRODUCTS_BY_KEYWORD = gql`
  query GetAllProductsByKeyword($keyword: String!) {
    getAllProductsByKeyword(keyword: $keyword) {
      id
      name
      description_short
      description_long
      picture
      price_fixed
      price_daily
      discount
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
