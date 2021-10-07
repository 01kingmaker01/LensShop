import { SET_USER, DEL_USER } from "../constant";

// const checkUserData = () => {
//   console.log({ object: localStorage.getItem("@userToken") });
//   const userData = JSON.parse(localStorage.getItem("@userToken"));
//   console.log(userData);
//   if (userData) {
//     return userData;
//   } else {
//     return null;state = checkUserData()
//   }
// };

export const userReducer = (state = null, { type, userPayload }) => {
  switch (type) {
    case SET_USER:
      return userPayload;
    case DEL_USER:
      console.log({ userPayload });
      return userPayload;

    default:
      return state;
  }
};
