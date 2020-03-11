import { ACTION_CHANGE_NAVBAR_MOD } from "../action";

export const homeReducer = (state = { navbarMod: false }, action) => {
  switch (action.type) {
    case ACTION_CHANGE_NAVBAR_MOD:
      return { ...state, navbarMod: action.payload };

    default:
      return state;
  }
};
