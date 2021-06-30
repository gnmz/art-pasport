import { EventActionType, IEventState, EventAction } from "../../types/event";

const initialState: IEventState = {
  event: [],
  loading: false,
  error: null,
};

export const eventReducer = ( state = initialState, action: EventAction ): IEventState => {
  switch (action.type) {
    case EventActionType.FETCH_EVENT:
      return { ...state, loading: true };
    case EventActionType.FETCH_EVENT_SUCCESS:
      return { ...state, loading: false, event: action.payload };
    case EventActionType.FETCH_EVENT_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
