import { Link } from "react-router-dom";
import "./EventListRow.css";

interface IEventListRowProps {
  event: any;
}

const EventListRow: React.FC<IEventListRowProps> = (props) => {
  const { title, location, startDate, endDate, price, id } = props.event;
  return (
    <div className="event-list-row">
      <div className="event-list-row-main">
        <h4 className="event-list-row-title">{title}</h4>
        <div className="event-list-row-description">
          <p className="event-list-row-location">Где проходит: {location}</p>
          <p>
            Дата проведения: {startDate} - {endDate}
          </p>
          <p>{price ? `Стоимость: ${price} руб.` : "Бесплатно"}</p>
        </div>
      </div>
      <div className="event-list-row-properties">
        <Link to={`/exhibitions/${id}`} className="event-list-row-btn">
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default EventListRow;
