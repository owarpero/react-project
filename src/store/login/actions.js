import { LOGGED_IN } from "../action";
import { message } from "antd";
import "firebase/auth";
import firebase from "firebase/app";
export const loginData = payload => {
  return {
    type: LOGGED_IN,
    payload
  };
};

export const loginLoadData = (values, history) => (dispatch, getState) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .then(
      () => {
        const user = firebase.auth().currentUser;
        localStorage.setItem("currentUser", JSON.stringify(user));
        dispatch(loginData(true));
        history.push("/home");
      },
      reason => {
        let errorMessage = reason.message;
        message.error(errorMessage);
      }
    );
};
