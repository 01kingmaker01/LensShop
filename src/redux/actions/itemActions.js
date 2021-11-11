import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from "redux/constant";

const URL =
  "http://localhost:6969/api/items" ||
  "https://lenshop-backend.herokuapp.com/api/items";

export const getItems = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}`);
    return dispatch({
      type: GET_ITEMS,
      itemPayload: [...data],
    });
  } catch (e) {
    console.error(e);
  }
};

export const addItem = async (item) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${URL}`, item);

    dispatch({
      type: ADD_ITEM,
      itemPayload: data,
    });
  } catch (e) {
    console.error(e);
  }
};

export const updateItem = async (id, item) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, item);

    dispatch({
      type: UPDATE_ITEM,
      itemPayload: Promise.all([id, data]),
    });
  } catch (e) {
    console.error(e);
  }
};

export const deleteItem = async (id) => async (dispatch) => {
  await axios.delete(`${URL}/${id}`);

  dispatch({
    type: DELETE_ITEM,
    itemPayload: id,
  });
};
