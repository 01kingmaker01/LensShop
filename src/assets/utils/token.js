/**
 *
 * token.js
 * axios default headers setup
 */

import axios from "axios";
// const instance = axios.create({
//   baseURL: "http://localhost:6969",
// });

axios.defaults.baseURL = "http://localhost:6969";

const setToken = async (token) => {
  console.warn({ token });
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setToken;
