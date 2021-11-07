import axios from "axios";
import { GET_CART, ADD_TO_CART, DELETE_FROM_CART } from "redux/constant";

export const getCart = (id) => async (dispatch) => {
  const { data } = await axios.get(`http://localhost:6969/api/cart/${id}`);
  return dispatch({
    type: GET_CART,
    payload: data,
  });
};

export const addToCart = (id, productId, quantity) => async (dispatch) => {
  const { data } = await axios.post(`http://localhost:6969/api/cart/${id}`, {
    productId,
    quantity,
  });
  return dispatch({
    type: ADD_TO_CART,
    payload: data,
  });
};

export const deleteFromCart = (userId, productId) => async (dispatch) => {
  const { data } = await axios.delete(
    `http://localhost:6969/api/cart/${userId}/${productId}`
  );
  return dispatch({
    type: DELETE_FROM_CART,
    payload: data,
  });
};

export const reduceFromCart =
  (userId, productId, quantity) => async (dispatch) => {
    console.log({ userId, productId, quantity });

    const { data } = await axios.patch(
      `http://localhost:6969/api/cart/${userId}`,
      { productId, quantity }
    );

    return dispatch({
      type: DELETE_FROM_CART,
      payload: data,
    });
  };
