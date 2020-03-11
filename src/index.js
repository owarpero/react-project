import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import App from "./App";
import firebase from "firebase/app";
import "firebase/database";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers";
import { Provider } from "react-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
const firebaseConfig = {
  apiKey: "AIzaSyB7F-X5N3sJy5dnA1qycrlKvENDxKFZU2Q",
  authDomain: "react-course-project-9c3eb.firebaseapp.com",
  databaseURL: "https://react-course-project-9c3eb.firebaseio.com",
  projectId: "react-course-project-9c3eb",
  storageBucket: "react-course-project-9c3eb.appspot.com",
  messagingSenderId: "498715712975",
  appId: "1:498715712975:web:d947c8a10ddaedf617c6ba",
  measurementId: "G-ELCYBZXZ7L"
};

firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(logger, thunk));
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);
