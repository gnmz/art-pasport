import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import "./EventCard.css";

interface IEventCardParams {
  id: string;
}

const EventCard: React.FC = () => {
  const { event, loading, error } = useTypedSelector((state) => state.event);
  const { fetchEvent } = useActions();
  const params = useParams<IEventCardParams>();

  const { title, location, startDate, endDate, price }: any = event;

  useEffect(() => {
    fetchEvent(params.id);
  }, []);

  if (loading) {
    return <h1>Идет загрузка</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="event-card">
      <div className="event-card-content">
        <h3>{title}</h3>
        <p>Проходит в {location}</p>
        <p>
          Дата проведения: c {startDate} по {endDate}
        </p>
        <p>{price ? `Стоимость: ${price} руб ` : `Вход бесплатный`}</p>
      </div>
      <Link to="/" className="event-card-return">
        Назад
      </Link>
    </div>
  );
};

export default EventCard;
