import { SET_USER, DEL_USER } from "../constant";

export const userReducer = (state = null, { type, userPayload }) => {
  switch (type) {
    case SET_USER:
      return userPayload;
    case DEL_USER:
      return userPayload;

    default:
      return state;
  }
};
