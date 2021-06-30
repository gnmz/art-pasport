export interface IUserState {
  currentUser: {};
  isAuth: boolean;

}

export enum UserActionType {
  SET_USER = "SET_USER",
  LOGOUT = "LOGOUT",
}

interface ISetUserAction {
  type: UserActionType.SET_USER;
  payload: {};
}

interface ILogoutAction {
  type: UserActionType.LOGOUT;
}

export type UserAction = ISetUserAction | ILogoutAction;
