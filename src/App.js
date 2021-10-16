import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import { Home } from "pages/Home";
import { onAuthStateChanged } from "@firebase/auth";

import { history } from "redux/store";
import "assets/styles/globalStyles.css";
import { auth, db } from "firebase";
import { SignIn } from "pages/SignIn";
import { SET_USER } from "redux/constant";
import { SignUp } from "pages/Signup";
import { collection, getDocs, query, where } from "@firebase/firestore";
import setToken from "assets/utils/token";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const { uid, accessToken } = user;
          const q = await query(
            collection(db, "users"),
            where("uid", "==", uid)
          );
          const querySnapshot = await getDocs(q);
          const userData = querySnapshot?.docs[0]?.data();
          if (userData) {
            const { displayName, email, photoURL } = userData;
            setToken(accessToken);
            dispatch({
              type: SET_USER,
              userPayload: { uid, email, displayName, photoURL },
            });
          }
        }
      } catch (error) {
        console.error({ error });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </>
    </ConnectedRouter>
  );
};
export default App;
