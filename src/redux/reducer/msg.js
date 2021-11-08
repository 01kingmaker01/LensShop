import { LOADING } from "../constant";

export const msgReducer = (state = true, { type, msgPayload }) => {
  switch (type) {
    case LOADING:
      return msgPayload;

    default:
      return state;
  }
};
