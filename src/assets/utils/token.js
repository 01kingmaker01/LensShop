/**
 *
 * token.js
 * axios default headers setup
 */

import axios from "axios";
const URL = "http://localhost:6969";
//  ||"https://lenshop-backend.herokuapp.com";

axios.defaults.baseURL = URL;

const setToken = async (token) => {
  console.warn({ token });
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setToken;
