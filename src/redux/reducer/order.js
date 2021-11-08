import { GET_ORDERS, CHECKOUT } from "redux/constant";

export const orderReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_ORDERS:
      return payload;

    case CHECKOUT:
      return [...state, payload];

    case "RESET_ORDERS":
      return payload;
    default:
      return state;
  }
};
