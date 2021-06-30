export interface IEventState {
  event: any[];
  loading: boolean;
  error: null | string;
}

export enum EventActionType {
  FETCH_EVENT = "FETCH_EVENT",
  FETCH_EVENT_SUCCESS = "FETCH_EVENT_SUCCESS",
  FETCH_EVENT_ERROR = "FETCH_EVENT_ERROR",
}

interface IFetchEventAction {
  type: EventActionType.FETCH_EVENT;
}

interface IFetchEventSuccessAction {
  type: EventActionType.FETCH_EVENT_SUCCESS;
  payload: any[];
}
interface IFetchEventErrorAction {
  type: EventActionType.FETCH_EVENT_ERROR;
  payload: string;
}

export type EventAction =
  | IFetchEventAction
  | IFetchEventSuccessAction
  | IFetchEventErrorAction;
