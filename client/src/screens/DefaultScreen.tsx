import { useEffect } from "react";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";

import EventsListWrapper from "../components/EventsListWrapper/EventsListWrapper";

const DefaultScreen: React.FC = () => {
  const { events, error, loading } = useTypedSelector((state) => state.events);
  const { fetchEventsLocation } = useActions();

  useEffect(() => {
    fetchEventsLocation();
  }, []);

  if (loading) {
    return <h1>Идет загрузка</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <EventsListWrapper events={events} />
    </div>
  );
};

export default DefaultScreen;
