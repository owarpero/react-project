import { SIGN_OUT } from "../action";

export const homeReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return { ...state };

    default:
      return state;
  }
};
