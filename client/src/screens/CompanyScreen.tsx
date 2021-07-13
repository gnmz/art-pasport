import { useState } from "react";

import EventsListWrapper from "../components/EventsListWrapper/EventsListWrapper";
import CompaniesEventsList from '../components/CompaniesEventsList/CompaniesEventsList'
import CompaniesAddEvent from '../components/CompaniesAddEvent/CompaniesAddEvent'

import { useTypedSelector } from "../hooks/useTypedSelector";

const CompanyScreen: React.FC = () => {
  const { events } = useTypedSelector((state) => state.events);
  const [isDefaultList, setIsDefaultList] = useState(true);
  const [isYourEventsList, setIsYourEventsList] = useState(false);
  const [isAddEvent, setIsAddEvent] = useState(false);

  const chooseListView = (item: string) => {
    if (item === "default") {
      setIsDefaultList(true);
      setIsYourEventsList(false);
      setIsAddEvent(false);
    }

    if (item === "your-list") {
      setIsYourEventsList(true);
      setIsDefaultList(false);
      setIsAddEvent(false);
    }

    if (item === "add-event") {
      setIsAddEvent(true);
      setIsDefaultList(false);
      setIsYourEventsList(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "20px",
          justifyContent: "space-around",
        }}
      >
        <button
          className={
            isDefaultList
              ? "event-list-action-btn-active"
              : "event-list-action-btn"
          }
          onClick={() => chooseListView("default")}
        >
          Список всех эвентов
        </button>
        <button
          className={
            isYourEventsList
              ? "event-list-action-btn-active"
              : "event-list-action-btn"
          }
          onClick={() => chooseListView("your-list")}
        >
          Список твоих эвентов
        </button>
        <button
          className={
            isAddEvent
              ? "event-list-action-btn-active"
              : "event-list-action-btn"
          }
          onClick={() => chooseListView("add-event")}
        >
          Добавить эвент
        </button>
      </div>
      <div>
        {isDefaultList && <EventsListWrapper events={events} />}
        {isYourEventsList && <CompaniesEventsList />}
        {isAddEvent && <CompaniesAddEvent />}
      </div>
    </div>
  );
};

export default CompanyScreen;
