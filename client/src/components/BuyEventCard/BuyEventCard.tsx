import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface IBuyEventCardParams {
  id: string;
}

const BuyEventCard: React.FC = () => {
  const { event } = useTypedSelector((state) => state.event);
  const { currentUser } = useTypedSelector((state) => state.auth);
  const { fetchEvent, auth } = useActions();
  const params = useParams<IBuyEventCardParams>();
  const [cardNumber, setCardNumber] = useState("");
  const [startPayment, setStartPayment] = useState(false)

  const { title, location, startDate, endDate, price, tickets }: any = event;
  const { firstName }: any = currentUser;
  useEffect(() => {
    fetchEvent(params.id);
  }, []);

  const cardNumberHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCardNumber(e.target.value);
  };
  const payment = () => {
    const ticket = tickets.find((item: any, index: any) => index === 0);

    const payment = {
      serialNumber: ticket.serialNumber,
      name: firstName,
      exhibitionName: title,
      locationName: location,
      address: null,
      price: price,
      isPurchased: true,
    };
    console.log(payment)
    startOfPayment()

    // let response = axios.post(
    //   `${API_URL}purchased-tickets`,
    //   { payment },
    //   {
    //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //   }
    // );
    // auth();
  };

  const startOfPayment = () => {
    setStartPayment(true)
    setTimeout(() => {
      setStartPayment(false)
    }, 2000);
  }

  return (
    <div className="buy-event-card">
      {tickets ? (price ? (
        <>
          <div className="event-card-content">
            <h3>{title}</h3>
            <p>Проходит в {location}</p>
            <p>
              Дата проведения: c {startDate} по {endDate}
            </p>
            <p>{price ? `Стоимость: ${price} руб ` : `Вход бесплатный`}</p>
          </div>
          {startPayment? <p>Начало платежа </p>:
          
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
              border: "1px solid black",
              width: "30%",
              margin: "0 auto",
            }}
          >
            <h4>оформление платежа</h4>
            <label>
              <span
                style={{ display: "block", textAlign: "center", margin: "5px" }}
              >
                Номер карты
              </span>
              <input
                type="text"
                value={cardNumber}
                onChange={cardNumberHandler}
              />
            </label>

            <p>Сумма оплаты: {price}</p>

            <button onClick={payment}>Оплатить</button>
          </div>}
        </>
      ) : (
        <>
          <div className="event-card-content">
            <h3>{title}</h3>
            <p>Проходит в {location}</p>
            <p>
              Дата проведения: c {startDate} по {endDate}
            </p>
            <p>{price ? `Стоимость: ${price} руб ` : `Вход бесплатный`}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
              border: "1px solid black",
              width: "30%",
              margin: "0 auto",
            }}
          >
            <h4>Оформление билета</h4>

            <p>Стоимость: бесплатно</p>

            <button onClick={payment}>Пойти бесплатно</button>
          </div>
        </>
      )): <h2 style={{textAlign:'center', marginTop: '50px'}}>Упс билеты кончились</h2>}
    </div>
  );
};

export default BuyEventCard;
