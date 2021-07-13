import React, { useState } from "react";

import CompaniesAddEventRow from "../CompaniesAddEventRow/CompaniesAddEventRow";

import "./CompaniesAddEvent.css";

const CompaniesAddEvent: React.FC = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tickets, setTickets] = useState([
    { serialNumber: "", price: price, isPurchased: false },
  ]);

  const [newEvent, setNewEvent] = useState(null)

  const [isAddTitle, setIsAddTitle] = useState(false);

  const titleHanlder: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const startDateHanlder: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setStartDate(e.target.value);
  };

  const endDateHanlder: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEndDate(e.target.value);
  };

  const descriptionHanlder: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setDescription(e.target.value);
  };

  const serialNumberHandler = (
    id: any,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const value = e.target.value;
    const updateTickets = tickets.map((item: any, index) => {
      if (index === id) {
        item.serialNumber = value;
      }
      if (item.price === "") {
        item.price = price;
      }
      return item;
    });
    setTickets([...updateTickets]);
  };

  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setPrice(value);
  };

  const addEvent = () => {
    const event:any = {
      title: title,
      startDate: startDate,
      endDate: endDate,
      description: description,
      tickets: tickets,
    };
    setNewEvent(event)
  };

  const addOneMoreTicket = () => {
    setTickets([
      ...tickets,
      { serialNumber: "", price: price, isPurchased: false },
    ]);
  };
  return (
    <div className="events-list-wrapper">
      <div
        style={{
          display: "flex",
          justifyContent: "space-beetwen",
        }}
        className="add-event"
      >
        <div style={{ width: "50%" }}>
          <label>
            <span>Название эвента</span>
            <input
              type="text"
              value={title}
              onChange={titleHanlder}
              onBlur={(e) => setIsAddTitle(true)}
            />
          </label>
          <label>
            <span>Цена</span>
            <input type="text" value={price} onChange={priceHandler} />
          </label>
          <label>
            <span>Дата начала эвента</span>
            <input type="text" value={startDate} onChange={startDateHanlder} />
          </label>
          <label>
            <span>Дата окончания</span>
            <input type="text" value={endDate} onChange={endDateHanlder} />
          </label>
          <label>
            <span>Описание эвента</span>
            <textarea
              onChange={descriptionHanlder}
              value={description}
            ></textarea>
          </label>

          <div>
            {tickets.map((item: any, index) => (
              <CompaniesAddEventRow
                key={index}
                serialNumber={item.serialNumber ? item.serialNumber : ""}
                serialNumberHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                  serialNumberHandler(index, e)
                }
              />
            ))}
          </div>

          <button onClick={addOneMoreTicket}>Добавить еще</button>
        </div>
        <div style={{ width: "50%" }}>
          <p>Название эвента : {isAddTitle && title}</p>
          <p>Стоимость билета: {price}</p>
          <p>Стартует : {startDate}</p>
          <p>Заканчивается : {endDate}</p>
          <p>Описание: {description}</p>
          <p>Добавленны билеты</p>
          {tickets.map((ticket, index) => <p key={index}>{ticket.serialNumber}</p>)}
        </div>
      </div>

      <button onClick={addEvent}>Опубликовать</button>
    </div>
  );
};

export default CompaniesAddEvent;
