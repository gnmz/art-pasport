import { IUserState, UserActionType, UserAction } from "../../types/user";

const initialState: IUserState = {
  currentUser: {},
  isAuth: false,

};

export const userReducer = (
  state = initialState,
  action: UserAction
): IUserState => {
  switch (action.type) {
    case UserActionType.SET_USER:
      return { ...state, currentUser: action.payload, isAuth: true };
    case UserActionType.LOGOUT:
      localStorage.removeItem("role");
      return { ...state, currentUser: {}, isAuth: false };
    default:
      return { ...state };
  }
};
