import { STATICTICS_RECORD_DATA_CHANGED } from "../../action";

export const statisticsReducer = (state = { recordData: [] }, action) => {
  switch (action.type) {
    case STATICTICS_RECORD_DATA_CHANGED:
      return { ...state, recordData: action.payload };

    default:
      return state;
  }
};
