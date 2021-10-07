import { connectRouter } from "connected-react-router";

import { combineReducers } from "redux";
// import { postsReducer } from "./posts";
import { userReducer } from "./user";

export const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    // postsReducer,
    userReducer,
  });
