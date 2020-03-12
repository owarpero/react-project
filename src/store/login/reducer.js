import { LOGGED_IN } from "../action";

export const LoginReducer = (
  state = {
    logedIn: false
  },
  action
) => {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, loginData: action.payload };

    default:
      return state;
  }
};
