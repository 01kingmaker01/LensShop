import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "redux/store";
import App from "./App";
// import Modal from "react-modal";

// Modal.setAppElement("#root") ;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
