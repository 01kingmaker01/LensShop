/* eslint-disable no-unused-vars */
import { CREATE, FETCH_ALL, SET_USER, UPDATE, DELETE } from "../constant";

export const checkUserData = () => async (dispatch) => {
  try {
    const userData = localStorage.getItem("@userToken");
    dispatch({
      type: SET_USER,
      userPayload: JSON.parse(userData),
    });
  } catch (error) {
    console.error(error);
  }
};
