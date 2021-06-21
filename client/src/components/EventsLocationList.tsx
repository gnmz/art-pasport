import { useEffect } from "react";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";

const EventsLocationList: React.FC = () => {
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
      {events.map((item) => (
        <div key={item.id}>
          <h4>{item.title}</h4>
          <p>{item.location}</p>
          <p>
            {item.startDate} - {item.endDate}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EventsLocationList;
