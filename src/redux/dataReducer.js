import {
  ADD_PRODUCT_TO_CART,
  CHANGE_PRODUCT_QUANTITY,
  CLOTHING_STORE_DATA_LOADED,
  REMOVE_PRODUCT,
  TOGGLE_CURRENCY,
} from "./types";

const initState = {
  category: null,
  currencies: null,
  currentCurrency: null,
  cartItems: [],
  cartItemsQuantity: null,
};

function compareAttrs(elem1, elem2) {
  const id1 = elem1.itemId + elem1.attrId;
  const id2 = elem2.itemId + elem2.attrId;

  if (id1 > id2) return 1;

  if (id1 < id2) return -1;

  return 0;
}

function compareSelectedAttrs(attr1, attr2) {
  if (attr1.length !== attr2.length) return false;

  const attr1Sorted = attr1.sort(compareAttrs);
  const attr2Sorted = attr2.sort(compareAttrs);

  for (let i = 0; i < attr1Sorted.length; i++) {
    const item1 = attr1Sorted[i];
    const item2 = attr2Sorted[i];

    const result = compareAttrs(item1, item2);

    if (result !== 0) return false;
  }
  return true;
}

export const dataReducer = (state = initState, action) => {
  switch (action.type) {
    case CLOTHING_STORE_DATA_LOADED:
      return {
        ...state,
        category: action.payload.category,
        currencies: action.payload.currencies,
        currentCurrency: state.currentCurrency || action.payload.currencies[0],
      };

    case TOGGLE_CURRENCY:
      return {
        ...state,
        currentCurrency: state.currencies[action.payload],
      };

    case ADD_PRODUCT_TO_CART: {
      const newItem = action.payload;
      let isSameProduct = false;

      const cartItems = state.cartItems.map((item) => {
        const isSameAttrs = compareSelectedAttrs(
          item.selectedAttributes,
          newItem.selectedAttributes
        );
        if (isSameAttrs && item.product.id === newItem.product.id) {
          isSameProduct = true;
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      if (!isSameProduct || cartItems.length === 0)
        cartItems.push({ ...newItem, quantity: 1 });

      return {
        ...state,
        cartItems: cartItems,
        cartItemsQuantity: state.cartItemsQuantity + 1,
      };
    }

    case CHANGE_PRODUCT_QUANTITY: {
      const cartItems = state.cartItems.map((item) => {
        const isSameAttrs = compareSelectedAttrs(
          item.selectedAttributes,
          action.payload.selectedAttributes
        );
        if (item.product.id == action.payload.productId && isSameAttrs) {
          return {
            ...item,
            quantity: item.quantity + action.payload.count,
          };
        }

        return item;
      });

      return {
        ...state,
        cartItems: cartItems,
        cartItemsQuantity: state.cartItemsQuantity + action.payload.count,
      };
    }

    case REMOVE_PRODUCT: {
      const cartItems = state.cartItems.filter((item) => {
        const isSameAttrs = compareSelectedAttrs(
          item.selectedAttributes,
          action.payload.selectedAttributes
        );
        if (item.product.id == action.payload.productId && isSameAttrs) {
          return false;
        }
        return true;
      });

      return {
        ...state,
        cartItems: cartItems,
        cartItemsQuantity: state.cartItemsQuantity - 1,
      };
    }

    default:
      return state;
  }
};
