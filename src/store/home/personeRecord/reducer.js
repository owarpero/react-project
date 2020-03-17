import { CURRENT_MONTH_DATA } from "../../action";

export const personeReducer = (state = { monthData: [] }, action) => {
  switch (action.type) {
    case CURRENT_MONTH_DATA:
      return { ...state, monthData: action.payload };

    default:
      return state;
  }
};
