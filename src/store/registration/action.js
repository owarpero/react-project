import { IMG_LOADING, AVATAR_IMG } from "../action";
import { message } from "antd";
import "firebase/auth";
import firebase from "firebase/app";

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

export const registrationLoadData = (values, history) => dispatch => {
  console.log(values);
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
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: values.nickname,
      photoURL: values.avatar
    })
    .then(function() {
      message.success("Registration completed successfully");
    })
    .catch(function(error) {
      message.error(error);
    });
};
export const showImg = e => dispatch => {
  const img = e.file;

  const storage = firebase
    .app()
    .storage("gs://react-course-project-9c3eb.appspot.com");
  storage
    .ref(`img/${img.name}`)
    .put(img)
    .on(
      "state_changed",
      snapshot => {
        console.log(snapshot);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("img")
          .child(img.name)
          .getDownloadURL()
          .then(URL => {
            dispatch(registrationLoadedImg(URL));
            dispatch(registrationLoadingImg(false));
          });
      }
    );
};
