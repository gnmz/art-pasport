import { combineReducers } from "redux";
import { eventReducer } from "./event";
import { eventsLocationReducer } from "./eventsLocation";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  events: eventsLocationReducer,
  event: eventReducer,
  auth: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
