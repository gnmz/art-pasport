import axios from "axios";
import { Dispatch } from "react";
import { UserAction, UserActionType } from "../../types/user";

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      let user = { email: email, password: password };
      const response = await axios.post("http://localhost:3001/login", {
        user,
      });
      dispatch({ type: UserActionType.SET_USER, payload: response.data.user });
      localStorage.setItem("token", response.data.token);
    } catch (error) {}
  };
};

export const logout = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionType.LOGOUT });
    localStorage.removeItem("token");
  };
};

export const auth = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await axios.get("http://localhost:3001/auth", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({ type: UserActionType.SET_USER, payload: response.data.user });
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      console.log(e.response.data.message)
      localStorage.removeItem("token");
    }
  };
};
