import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";

import { cartReducer } from "./cart";
import { itemReducer } from "./item";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { msgReducer } from "./msg";

export const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    cartReducer,
    itemReducer,
    orderReducer,
    userReducer,
    msgReducer,
  });
