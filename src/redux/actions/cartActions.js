import axios from "axios";
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART } from "redux/constant";

const URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_URL
    : "https://lensshop.herokuapp.com/api";

export const getCart = (id) => async (dispatch) => {
  const { data } = await axios.get(`${URL}/cart/${id}`);
  return dispatch({
    type: GET_CART,
    payload: data,
  });
};

export const addToCart = (id, productId, quantity) => async (dispatch) => {
  const { data } = await axios.post(`${URL}/cart/${id}`, {
    productId,
    quantity,
  });
  return dispatch({
    type: ADD_TO_CART,
    payload: data,
  });
};

export const deleteFromCart = (userId, productId) => async (dispatch) => {
  const { data } = await axios.delete(`${URL}/cart/${userId}/${productId}`);
  return dispatch({
    type: DELETE_FROM_CART,
    payload: data,
  });
};

export const reduceFromCart =
  (userId, productId, quantity) => async (dispatch) => {
    const { data } = await axios.patch(`${URL}/cart/${userId}`, {
      productId,
      quantity,
    });

    return dispatch({
      type: DELETE_FROM_CART,
      payload: data,
    });
  };
