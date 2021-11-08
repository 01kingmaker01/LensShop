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
import { getItems } from "redux/actions/itemActions";
import { getCart } from "redux/actions/cartActions";
// import { userReducer } from "redux/reducer/user";
import { Item } from "pages/Item";
import { Cart } from "pages/Cart";
import { getOrders } from "redux/actions/orderActions";
import { Orders } from "pages/Order";

const App = () => {
  const dispatch = useDispatch();

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        try {
          dispatch(getItems());
          if (user) {
            const { uid, accessToken } = user;
            const q = query(collection(db, "users"), where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            const userData = querySnapshot?.docs[0]?.data();

            if (userData) {
              const { displayName, email, photoURL } = userData;

              setToken(accessToken);
              return (
                dispatch({
                  type: SET_USER,
                  userPayload: { uid, email, displayName, photoURL },
                }),
                dispatch(getCart(uid)),
                dispatch(getOrders(uid))
              );
            }
          }
        } catch (error) {
          console.error({ error });
        }
      }),
    [dispatch]
  );

  // useEffect(() => {}, [dispatch]);

  // useEffect(
  //   () =>
  //     userReducer
  //       ? (dispatch(getCart(userReducer?.uid)),
  //         dispatch(getOrders(userReducer?.uid)))
  //       : null,
  //   [userReducer, dispatch]
  // );

  return (
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/addItem" component={Item} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/orders" component={Orders} />
        </Switch>
      </>
    </ConnectedRouter>
  );
};
export default App;
