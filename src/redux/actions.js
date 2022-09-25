import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  GET_CATEGORY_NAMES_AND_CURRENCIES,
  GET_CLOTHING_STORE_CATEGORY,
  GET_CLOTHING_STORE_PRODUCT,
} from "../query/clothing-store-data";
import {
  ADD_PRODUCT_TO_CART,
  CATEGORIES_LOADED,
  CATEGORY_LOADED,
  CATEGORY_NAMES_AND_CURRENCIES_LOADED,
  CHANGE_PRODUCT_QUANTITY,
  PRODUCT_BEGIN_LOADING,
  PRODUCT_LOADED,
  REMOVE_PRODUCT,
  TOGGLE_CURRENCY,
} from "./types";

const client = new ApolloClient({
  uri:
    process.env.REACT_APP_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Product: {
        keyFields: false,
      },
      AttributeSet: {
        keyFields: false,
      },
      Attribute: {
        keyFields: false,
      },
    },
  }),
});

export const loadCategoryNamesAndCurrencies = () => {
  return async (dispatсh) => {
    const data = await client.query({
      query: GET_CATEGORY_NAMES_AND_CURRENCIES,
    });
    dispatсh({
      type: CATEGORY_NAMES_AND_CURRENCIES_LOADED,
      payload: data.data,
    });
  };
};

export const loadClothingStoreCategory = (categoryName) => {
  return async (dispatсh) => {
    const category = await client.query({
      query: GET_CLOTHING_STORE_CATEGORY,
      variables: {
        categoryName: categoryName,
      },
    });
    dispatсh({
      type: CATEGORY_LOADED,
      payload: category.data.category,
    });
  };
};

export const loadClothingStoreProduct = (productName) => {
  return async (dispatсh) => {
    dispatсh({
      type: PRODUCT_BEGIN_LOADING,
    });
    const product = await client.query({
      query: GET_CLOTHING_STORE_PRODUCT,
      variables: {
        productName: productName,
      },
    });
    dispatсh({
      type: PRODUCT_LOADED,
      payload: product.data.product,
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
