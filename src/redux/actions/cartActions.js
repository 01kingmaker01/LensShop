import axios from "axios";
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART } from "redux/constant";

const URL =
  "http://localhost:6969/api/cart" ||
  "https://lenshop-backend.herokuapp.com/api/cart";

export const getCart = (id) => async (dispatch) => {
  const { data } = await axios.get(`${URL}/${id}`);
  return dispatch({
    type: GET_CART,
    payload: data,
  });
};

export const addToCart = (id, productId, quantity) => async (dispatch) => {
  const { data } = await axios.post(`${URL}/${id}`, {
    productId,
    quantity,
  });
  return dispatch({
    type: ADD_TO_CART,
    payload: data,
  });
};

export const deleteFromCart = (userId, productId) => async (dispatch) => {
  const { data } = await axios.delete(`${URL}/${userId}/${productId}`);
  return dispatch({
    type: DELETE_FROM_CART,
    payload: data,
  });
};

export const reduceFromCart =
  (userId, productId, quantity) => async (dispatch) => {
    const { data } = await axios.patch(`${URL}/${userId}`, {
      productId,
      quantity,
    });

    return dispatch({
      type: DELETE_FROM_CART,
      payload: data,
    });
  };
