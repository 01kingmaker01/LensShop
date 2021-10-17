import axios from "axios";
import { GET_ORDERS, CHECKOUT } from "redux/constant";

export const getOrders = async (id) => async (dispatch) => {
  const { data } = await axios.get(`http://localhost:6969/api/order/${id}`);
  dispatch({
    type: GET_ORDERS,
    payload: data,
  });
};

export const checkout = async (id, source) => async (dispatch) => {
  const { data } = await axios.post(`http://localhost:6969/api/order/${id}`, {
    source,
  });
  dispatch({
    type: CHECKOUT,
    payload: data,
  });
};
