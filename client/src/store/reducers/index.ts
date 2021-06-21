import { combineReducers } from "redux";
import { eventsLocationReducer } from "./eventsLocation";

export const rootReducer = combineReducers({
  events: eventsLocationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
