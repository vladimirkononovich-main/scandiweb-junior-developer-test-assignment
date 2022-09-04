import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_CLOTHING_STORE_DATA } from "../query/clothing-store-data";
import {
  ADD_PRODUCT_TO_CART,
  CHANGE_PRODUCT_QUANTITY,
  CLOTHING_STORE_DATA_LOADED,
  REMOVE_PRODUCT,
  TOGGLE_CURRENCY,
} from "./types";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export const loadClothingStoreData = (categoryId) => {
  return async (dispatсh) => {
    const data = await client.query({
      query: GET_CLOTHING_STORE_DATA,
      variables: {
        categoryName: categoryId,
      },
    });
    dispatсh({
      type: CLOTHING_STORE_DATA_LOADED,
      payload: data.data,
    });
  };
};

export const toggleCurrency = (arg) => {
  return {
    type: TOGGLE_CURRENCY,
    payload: arg,
  };
};

export const addProductToCart = (cartItems) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: cartItems,
  };
};

export const changeProductQuantity = (count, productId, selectedAttributes) => {
  return {
    type: CHANGE_PRODUCT_QUANTITY,
    payload: { count, productId, selectedAttributes },
  };
};

export const removeProduct = (productId, selectedAttributes) => {
  return {
    type: REMOVE_PRODUCT,
    payload: { productId, selectedAttributes },
  };
};
