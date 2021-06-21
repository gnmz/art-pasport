import {
  EventsLocationAction,
  EventsLocationActionType,
  IEventsLocationState,
} from "../../types/eventsLocation";

const initialState: IEventsLocationState = {
  events: [],
  loading: false,
  error: null,
};

export const eventsLocationReducer = ( state = initialState, action: EventsLocationAction ): IEventsLocationState => {
  switch (action.type) {
    case EventsLocationActionType.FETCH_EVENTS:
      return { ...state, loading: true };
    case EventsLocationActionType.FETCH_EVENTS_SUCCESS:
      return { ...state, loading: false, events: action.payload };
    case EventsLocationActionType.FETCH_EVENTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
