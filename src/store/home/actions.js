import { ACTION_CHANGE_NAVBAR_MOD } from "../action";
export const changeNavbarMod = newMod => {
  return {
    type: ACTION_CHANGE_NAVBAR_MOD,
    payload: newMod
  };
};
