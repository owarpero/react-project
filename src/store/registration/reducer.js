import { NEW_USER_REGISTERED, IMG_LOADING, AVATAR_IMG } from "../action";

export const registeredReducer = (
  state = {
    newRegisteredUser: { email: "", password: "", nickname: "", remember: true }
  },
  action
) => {
  switch (action.type) {
    case NEW_USER_REGISTERED:
      return { ...state, newRegisteredUser: action.payload };
    case IMG_LOADING:
      return { ...state, imgLoading: action.payload };
    case AVATAR_IMG:
      return { ...state, avatarImg: action.payload };

    default:
      return state;
  }
};
