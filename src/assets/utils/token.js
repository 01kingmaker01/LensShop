/**
 *
 * token.js
 * axios default headers setup
 */

import axios from "axios";
const URL = "https://lensshop.herokuapp.com";

axios.defaults.baseURL = URL;

const setToken = async (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setToken;
