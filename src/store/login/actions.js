import { LOGIN_DATA, LOGGED_IN } from "../action";
import { message } from "antd";
import "firebase/auth";
import firebase from "firebase/app";
export const loginData = payload => {
  return {
    type: LOGIN_DATA,
    payload
  };
};
export const loggedIn = () => {
  return {
    type: LOGGED_IN
  };
};

export const loginLoadData = (values, history) => (dispatch, getState) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .then(
      () => {
        dispatch(loggedIn());
        history.push("/home");
      },
      reason => {
        let errorMessage = reason.message;
        message.error(errorMessage);
      }
    );
  const u = firebase.User();
  console.log(u);
};
