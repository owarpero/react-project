import { CURRENT_MONTH_DATA } from "../../action";

export const currentMonthData = payload => {
  return {
    type: CURRENT_MONTH_DATA,
    payload
  };
};
