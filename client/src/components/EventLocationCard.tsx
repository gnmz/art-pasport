import axios from "axios";

interface IEventLocationProps {
  event: any;
  onClick: (item: any) => void;
}

const EventLocationCard: React.FC<IEventLocationProps> = (
  props: IEventLocationProps
) => {
  const { onClick } = props;
  const { id, title, location, startDate, endDate, price } = props.event;
  const addToFavorite = async (item: any) => {
    const json = { id: item };
    await axios.post("http://localhost:3001/favorites", json, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="event-location-card">
      <div>
        <h4>{title}</h4>
        <p>{location}</p>
        <p>
          {startDate} - {endDate}
        </p>
      </div>
      {price ? (
        <div>
          <p>{price} руб.</p>
          <button>Купить билет</button>
        </div>
      ) : (
        <div>
          <button onClick={() => addToFavorite(id)}>Посетить бесплатно</button>
        </div>
      )}
      <button onClick={onClick}>x</button>
    </div>
  );
};

export default EventLocationCard;
