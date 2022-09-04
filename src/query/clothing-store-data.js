import { gql } from "@apollo/client";

export const GET_CLOTHING_STORE_DATA = gql`
  query ($categoryName: String!) {
    category(input: { title: $categoryName }) {
      name
      products {
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
    currencies {
      label
      symbol
    }
  }
`;
