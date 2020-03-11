import { NEW_USER_REGISTERED, IMG_LOADING, AVATAR_IMG } from "../action";
import { message } from "antd";
import "firebase/auth";
import firebase from "firebase/app";
import nanoid from "nanoid";

export const registrationLoadingImg = payload => {
  return {
    type: IMG_LOADING,
    payload
  };
};
export const registrationLoadedImg = payload => {
  return {
    type: AVATAR_IMG,
    payload
  };
};

export const registrationLoadData = (values, history) => (
  dispatch,
  getState
) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(
      () => {
        history.push("/login");
        dispatch(registrationLoadUser(values));
      },
      reason => {
        let errorMessage = reason.message;

        message.error(errorMessage);
      }
    );
};
export const registrationLoadUser = values => (dispatch, getState) => {
  console.log(values);
  firebase
    .database()
    .ref("users/" + values.email)
    .set({
      username: values.nickname,
      email: values.email,
      profile_picture: values.avatar
    });
};
