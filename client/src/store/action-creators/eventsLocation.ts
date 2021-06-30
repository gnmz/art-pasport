import axios from "axios";
import { Dispatch } from "react";
import { API_URL } from "../../config";
import {
  EventsLocationAction,
  EventsLocationActionType,
} from "../../types/eventsLocation";

export const fetchEventsLocation = () => {
  return async (dispatch: Dispatch<EventsLocationAction>) => {
    try {
      dispatch({ type: EventsLocationActionType.FETCH_EVENTS });
      const response = await axios.get(API_URL);
      dispatch({
        type: EventsLocationActionType.FETCH_EVENTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: EventsLocationActionType.FETCH_EVENTS_ERROR,
        payload: "Произошла зашибка при загрузке списка эвентов",
      });
    }
  };
};
