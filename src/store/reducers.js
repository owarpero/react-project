import { combineReducers } from "redux";
import { homeReducer } from "./home/reducer";
import { LoginReducer } from "./login/reducer";
import { registeredReducer } from "./registration/reducer";
export default combineReducers({
  homeReducer,
  LoginReducer,
  registeredReducer
});
