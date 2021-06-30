import axios from "axios";
import { Dispatch } from "react";
import {
  EventsLocationAction,
  EventsLocationActionType,
} from "../../types/eventsLocation";

export const fetchEventsLocation = () => {
  return async (dispatch: Dispatch<EventsLocationAction>) => {
    try {
      dispatch({ type: EventsLocationActionType.FETCH_EVENTS });
      const response = await axios.get("http://localhost:3001/");
      dispatch({
        type: EventsLocationActionType.FETCH_EVENTS_SUCCESS,
        payload: response.data.sort((a:any, b:any) => {
          if (a.startDate > b.startDate) {
            return 1;
          } else {
            return -1;
          }
        }),
      });
    } catch (error) {
      dispatch({
        type: EventsLocationActionType.FETCH_EVENTS_ERROR,
        payload: "Произошла зашибка при загрузке списка эвентов",
      });
    }
  };
};
