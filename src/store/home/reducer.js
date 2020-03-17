import { SIGN_OUT, DATA_CHANGED, DATA_TRACKING_CHANGED } from "../action";

export const homeReducer = (state = { date: {}, trackingDate: {} }, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return { ...state };
    case DATA_CHANGED:
      return { ...state, date: action.date };
    case DATA_TRACKING_CHANGED:
      return { ...state, trackingDate: action.date };

    default:
      return state;
  }
};
