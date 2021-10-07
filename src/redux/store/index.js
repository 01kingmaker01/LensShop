import { createStore, applyMiddleware, compose } from "redux";
import { reducers } from "../reducer";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const store = createStore(
  reducers(history),
  compose(
    applyMiddleware(routerMiddleware(history), thunk),
    typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
