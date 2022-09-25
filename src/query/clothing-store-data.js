import { gql } from "@apollo/client";

export const GET_CATEGORY_NAMES_AND_CURRENCIES = gql`
  query {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

export const GET_CLOTHING_STORE_CATEGORY = gql`
  query ($categoryName: String!) {
    category(input: { title: $categoryName }) {
      products {
        id
        name
        brand
        inStock
        gallery
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`;

export const GET_CLOTHING_STORE_PRODUCT = gql`
  query ($productName: String!) {
    product(id: $productName) {
      name
      brand
      id
      gallery
      inStock
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`;
