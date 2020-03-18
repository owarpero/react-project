import { STATICTICS_RECORD_DATA_CHANGED } from "../../action";

export const statisticsRecordChanged = payload => {
  return {
    type: STATICTICS_RECORD_DATA_CHANGED,
    payload
  };
};
