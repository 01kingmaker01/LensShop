/* eslint-disable no-unused-vars */
import axios from "axios";
import { GET_ORDERS, CHECKOUT } from "redux/constant";

const URL =
  "http://localhost:6969/api" || "https://lenshop-backend.herokuapp.com/api";

export const getOrders = (id) => async (dispatch) => {
  const { data } = await axios.get(`${URL}/order/${id}`);
  dispatch({
    type: GET_ORDERS,
    payload: data,
  });
};

export const checkout = (id, source) => async (dispatch) => {
  const { data } = await axios.post(`${URL}/order/${id}`, {
    source,
  });
  dispatch({
    type: CHECKOUT,
    payload: data,
  });
};

export const StripeCheckoutAction = (id) => async () => {
  const { data } = await axios.post(`${URL}/checkout/${id}`);
  window.location = data?.url;
};
