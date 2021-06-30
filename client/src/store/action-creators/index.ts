import * as EventsLocationActionCreator from "./eventsLocation";
import * as EventActionCreator from "./event";
import * as UserActionCreator from "./user";

const actionCreator = {
  ...EventsLocationActionCreator,
  ...EventActionCreator,
  ...UserActionCreator,
};

export default actionCreator;
