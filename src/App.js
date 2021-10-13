import React from "react";
import { useDispatch } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import { Home } from "pages/Home";
import { onAuthStateChanged } from "@firebase/auth";

import { history } from "redux/store";
import "assets/styles/globalStyles.css";
import { auth } from "firebase";
import { LogIn } from "pages/LogIn";
import { SET_USER } from "redux/constant";
import { SignUp } from "pages/Signup";

const App = () => {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const { uid, email, displayName, photoURL } = user;

      console.log({ APP: { uid, email, displayName, photoURL } });

      dispatch({
        type: SET_USER,
        userPayload: { uid, email, displayName, photoURL },
      });
    }
  });
  return (
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </>
    </ConnectedRouter>
  );
};
export default App;
