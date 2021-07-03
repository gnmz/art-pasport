import axios from "axios";
import { Dispatch } from "react";
import { UserAction, UserActionType } from "../../types/user";
import { API_URL } from "../../config";

export const login = (email: string, password: string, role: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      let user = { email: email, password: password, role: role };
      const response = await axios.post(`${API_URL}login`, {
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
      const response = await axios.get(`${API_URL}auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch({ type: UserActionType.SET_USER, payload: response.data.user });
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      console.log(e.response.data.message);
      localStorage.removeItem("token");
    }
  };
};
