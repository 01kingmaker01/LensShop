/**
 *
 * token.js
 * axios default headers setup
 */

import axios from "axios";
// const instance = axios.create({
//   baseURL: "https://lenshop-backend.herokuapp.com/",
// });

axios.defaults.baseURL = "https://lenshop-backend.herokuapp.com/";

const setToken = async (token) => {
  console.warn({ token });
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setToken;
