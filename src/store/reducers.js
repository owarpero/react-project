import { combineReducers } from "redux";
import { homeReducer } from "./home/reducer";
import { personeReducer } from "./home/personeRecord/reducer";
import { LoginReducer } from "./login/reducer";
import { registeredReducer } from "./registration/reducer";
import { trackingReducer } from "./home/customTracking/reducer";
import { statisticsReducer } from "./home/statisticsCompared/reducer";

export default combineReducers({
  homeReducer,
  LoginReducer,
  registeredReducer,
  personeReducer,
  trackingReducer,
  statisticsReducer
});
