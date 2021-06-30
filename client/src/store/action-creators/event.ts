import axios from "axios";
import { Dispatch } from "react";
import { EventAction, EventActionType } from "../../types/event";

export const fetchEvent = (id: string) => {
  return async (dispatch: Dispatch<EventAction>) => {
    try {
      dispatch({ type: EventActionType.FETCH_EVENT });
      const response = await axios.get(
        `http://localhost:3001/exhibitions/${id}`
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
