import { CURRENT_TRACKING_DATA, OPTIONS_SELECT_TRACKING } from "../../action";

export const currentTrackinghData = payload => {
  return {
    type: CURRENT_TRACKING_DATA,
    payload
  };
};
export const optionsSelectTracking = payload => {
  return {
    type: OPTIONS_SELECT_TRACKING,
    payload
  };
};
