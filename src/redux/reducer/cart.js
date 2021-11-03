import { GET_CART, ADD_TO_CART, DELETE_FROM_CART } from "redux/constant";

export const cartReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_CART:
      return payload;

    case ADD_TO_CART:
      return payload;

    case DELETE_FROM_CART:
      return payload;

    default:
      return state;
  }
};
