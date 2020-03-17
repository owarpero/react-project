import { SIGN_OUT, DATA_CHANGED, DATA_TRACKING_CHANGED } from "../action";
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

const dateValidator = date => {
  let newDate;
  if (date === undefined) {
    newDate = new Date();
  } else {
    newDate = new Date(date);
  }
  const fullDate = `${newDate.getFullYear()}-${newDate.getMonth() +
    1}-${newDate.getDate()}`;
  const yearAndMonth = `${newDate.getFullYear()}-${newDate.getMonth() + 1}`;
  const day = `${newDate.getDate()}`;
  const month = `${newDate.getMonth() + 1}`;
  return {
    day,
    yearAndMonth,
    fullDate,
    month
  };
};

export const dataChanged = date => {
  const data = dateValidator(date);
  return {
    type: DATA_CHANGED,
    date: {
      ...data
    }
  };
};
export const dataTrackingChanged = date => {
  const data = dateValidator(date);
  return {
    type: DATA_TRACKING_CHANGED,
    date: {
      ...data
    }
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
