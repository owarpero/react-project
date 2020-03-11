import { LOGIN_DATA, LOGGED_IN } from "../action";

export const LoginReducer = (
  state = {
    loginData: { email: "", password: "", remember: true },
    logedIn: false
  },
  action
) => {
  switch (action.type) {
    case LOGIN_DATA:
      return { ...state, loginData: action.payload };
    case LOGGED_IN:
      return { ...state, logedIn: true };

    default:
      return state;
  }
};
