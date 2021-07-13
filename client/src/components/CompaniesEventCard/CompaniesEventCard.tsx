import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import "./CompaniesEventCard.css";

interface ICompaniesEventCardParams {
  id: string;
}

const CompaniesEventCard: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    startDate: "",
    endDate: "",
    price: "",
    tickets: [],
  });
  const { title, startDate, endDate, tickets, price }: any = currentEvent;

  const [addTickets, setAddTickets] = useState([
    { id: "", serialNumber: "", price: price, isPurchased: false },
  ]);

  const [isAdd, setIsAdd] = useState(false);
  const [publish, setPublish] = useState(true)

  const params = useParams<ICompaniesEventCardParams>();
  const id = +params.id;

  useEffect(() => {
    const fetchdata = async () => {
      let response = await axios.get(`${API_URL}companies-events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCurrentEvent(response.data);
    };
    fetchdata();
  }, []);

  const purchasedTickets = (arr: any) => {
    return arr
      .filter((ticket: any) => ticket.isPurchased === true)
      .map((item: any) => <p key={item.id}>{item.serialNumber}</p>);
  };

  const notPurchasedTickets = (arr: any) => {
    return arr
      .filter((ticket: any) => ticket.isPurchased === false)
      .map((item: any) => <p key={item.id}>{item.serialNumber}</p>);
  };

  const isPurchased = (arr: any) => {
    let filtredArr = arr.filter((item: any) => item.isPurchased === true);
    if (filtredArr.length === 0) {
      return true;
    }
  };

  const addOneMoreTicket = () => {
    if (addTickets.length === 20) {
      return alert("Добавлено максимальное количество за раз");
    }
    setAddTickets([
      ...addTickets,
      { id: "", serialNumber: "", price: price, isPurchased: false },
    ]);
  };

  const publishTickets = async () => {
    let title = currentEvent.title;
    let tickets = addTickets.map((item) => {
      if (item.price !== price) {
        item.price = price;
      }
      return item;
    });
    let response = await axios.post(
      `${API_URL}publish-tickets`,
      { title, tickets },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  };

  const serialNumberHandler = (id:any, e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const addTicketsUpdate = addTickets.map((item: any, index) => {
      if (index === id) {
        item.serialNumber = value
      }
      if(item.serialNumber.length > 0 && item.serialNumber !== ''){
        setPublish(false)
      }
      else{
        setPublish(true)
      }
      return item
    })
    setAddTickets([...addTicketsUpdate])
  }

  const closeAddTicketWindow = () => {
    setIsAdd(false)
    setAddTickets([{id: "", serialNumber: "", price: price, isPurchased: false}])
  }

  const removeInput = (id:any) => {
    const remove = addTickets.filter((item, index) => index !== id)
    setAddTickets(remove)
  }

  const  removeAllInputs =( ) => {
    setAddTickets([{id: "", serialNumber: "", price: price, isPurchased: false}])
  }

  return (
    <div className="companes-event-card">
      <p>Название выставки{title}</p>
      <p>цена билета: {price}</p>
      <p>начало эвента : {startDate}</p>
      <p>конец эвента : {endDate}</p>
      <p>Список билетов</p>
      <p>Билеты в продаже:</p>
      {notPurchasedTickets(tickets)}
      {isPurchased(tickets) ? (
        <p>еще ничего не купили</p>
      ) : (
        <>
          <p>Купленные билеты: </p>
          {purchasedTickets(tickets)}
        </>
      )}

      <button onClick={() => setIsAdd(true)} className="add-ticket-btn">Добавить билеты на эвент</button>

      {isAdd && (
        <div className="add-ticket">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <h4 style={{ textAlign: "center", width: "95%" }}>
              Добавление билетов на эвент
            </h4>
            <button
              onClick={closeAddTicketWindow}
              className="add-ticket-close-btn"
            >
              X
            </button>
          </div>

          <div style={{ flex: "0.9" }}>
            <div className='add-tickets-content'>
              {addTickets.map((item, index) => (
                <div style={{display: 'flex', alignItems:'center', width:'100%'}}>
                <input
                  value={item.serialNumber ? item.serialNumber : ""}
                  onChange={(e)=>serialNumberHandler(index ,e)}
                  type="text"
                  className="add-ticket-input"
                  key={index}
                /><button style={{padding: '5px', marginLeft:'10px'}} onClick={()=>removeInput(index)} >X</button></div>
              ))}
            </div>

            <button
              className="add-ticket-one-more-btn"
              onClick={addOneMoreTicket}
              disabled={addTickets.length === 20}
            >
              + add one more
            </button>
            <button className="add-ticket-one-more-btn" style={{marginLeft:'20px'}} onClick={removeAllInputs}>remove all</button>
          </div>
          <button onClick={publishTickets} className="add-ticket-publish" disabled={publish}>
            Опубликовать
          </button>
        </div>
      )}
    </div>
  );
};

export default CompaniesEventCard;
