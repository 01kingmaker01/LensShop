import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import { history } from "redux/store";
import "assets/styles/globalStyles.css";
import "tailwindcss/dist/base.css";
import { useSelector } from "react-redux";

import { Home } from "pages/Home";
import { LogIn } from "pages/LogIn";

const App = () => {
  const { userReducer } = useSelector((state) => {
    return state;
  });

  return (
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={LogIn} />
        </Switch>
      </>
    </ConnectedRouter>
  );
};
export default App;
