import { CURRENT_TRACKING_DATA, OPTIONS_SELECT_TRACKING } from "../../action";

export const trackingReducer = (state = { trackingData: [] }, action) => {
  switch (action.type) {
    case CURRENT_TRACKING_DATA:
      return { ...state, trackingData: action.payload };
    case OPTIONS_SELECT_TRACKING:
      return { ...state, optionsSelect: action.payload };
    default:
      return state;
  }
};
