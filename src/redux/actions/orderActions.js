/* eslint-disable no-unused-vars */
import axios from "axios";
import { GET_ORDERS, CHECKOUT } from "redux/constant";

export const getOrders = (id) => async (dispatch) => {
  const { data } = await axios.get(
    `https://lenshop-backend.herokuapp.com//api/order/${id}`
  );
  dispatch({
    type: GET_ORDERS,
    payload: data,
  });
};

export const checkout = (id, source) => async (dispatch) => {
  const { data } = await axios.post(
    `https://lenshop-backend.herokuapp.com//api/order/${id}`,
    {
      source,
    }
  );
  dispatch({
    type: CHECKOUT,
    payload: data,
  });
};

export const StripeCheckoutAction = (id) => async () => {
  const { data } = await axios.post(
    `https://lenshop-backend.herokuapp.com//api/checkout/${id}`
  );
  console.log({ data });
};
