import axios from "axios";
import { Dispatch } from "react";
import { API_URL } from "../../config";
import { EventAction, EventActionType } from "../../types/event";

export const fetchEvent = (id: string) => {
  return async (dispatch: Dispatch<EventAction>) => {
    try {
      dispatch({ type: EventActionType.FETCH_EVENT });
      const response = await axios.get(
        `${API_URL}exhibitions/${id}`
      );
      dispatch({
        type: EventActionType.FETCH_EVENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: EventActionType.FETCH_EVENT_ERROR,
        payload: "Произошла ошибка при загрузке",
      });
    }
  };
};
