import { SIGN_OUT } from "../action";
import "firebase/auth";
import firebase from "firebase/app";
import { message } from "antd";
import { loginData } from "../login/actions";

export const signOut = payload => {
  return {
    type: SIGN_OUT,
    payload: payload
  };
};
export const currentUserSignOut = history => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      message.success("Sing out success!");
      localStorage.removeItem("currentUser");
      dispatch(loginData(false));
      history.push("/login");
    })
    .catch(function(error) {
      message.error(error);
    });
};
