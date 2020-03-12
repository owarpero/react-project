import { IMG_LOADING, AVATAR_IMG } from "../action";

export const registeredReducer = (state = {}, action) => {
  switch (action.type) {
    case IMG_LOADING:
      return { ...state, imgLoading: action.payload };
    case AVATAR_IMG:
      return { ...state, avatarImg: action.payload };

    default:
      return state;
  }
};
