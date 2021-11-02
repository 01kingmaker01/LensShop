import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getItems } from "redux/actions/itemActions";
import { getCart } from "redux/actions/cartActions";
// import { userReducer } from "redux/reducer/user";
import { Item } from "pages/Item";
import { Cart } from "pages/Cart";

const App = () => {
  const dispatch = useDispatch();
  const { userReducer } = useSelector((state) => state);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const { uid, accessToken } = user;
          const q = query(collection(db, "users"), where("uid", "==", uid));
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

          return dispatch(getItems());
        }
      } catch (error) {
        console.error({ error });
      }
    });
  }, [dispatch]);

  // useEffect(() => {}, [dispatch]);

  useEffect(
    () => (userReducer ? dispatch(getCart(userReducer?.uid)) : null),
    [userReducer, dispatch]
  );

  return (
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/addItem" component={Item} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </>
    </ConnectedRouter>
  );
};
export default App;
