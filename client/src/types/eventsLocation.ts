export interface IEventsLocationState {
  events: any[];
  loading: boolean;
  error: null | string;
}

export enum EventsLocationActionType {
  FETCH_EVENTS = "FETCH_EVENTS",
  FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS",
  FETCH_EVENTS_ERROR = "FETCH_EVENTS_ERROR",
}

interface IFetchEventsLocationAction {
  type: EventsLocationActionType.FETCH_EVENTS;
}

interface IFetchEventsLocationSuccessAction {
  type: EventsLocationActionType.FETCH_EVENTS_SUCCESS;
  payload: any[];
}
interface IFetchEventsLocationErrorAction {
  type: EventsLocationActionType.FETCH_EVENTS_ERROR;
  payload: string;
}

export type EventsLocationAction =
  | IFetchEventsLocationAction
  | IFetchEventsLocationSuccessAction
  | IFetchEventsLocationErrorAction;
