import React from "react";

import EventListRow from "../EventListRow/EventListRow";

import "./EventsListWrapper.css";

interface IEventsListWrapperProps {
  events: any[];
}

const EventsListWrapper: React.FC<IEventsListWrapperProps> = (props) => {
  const { events } = props;
  return (
    <div className="events-list-wrapper">
      {events.map((event) => (
        <div key={event.id}>
          <EventListRow event={event} />
        </div>
      ))}
    </div>
  );
};

export default EventsListWrapper;
