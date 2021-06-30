import { useEffect } from "react";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";

import EventsListWrapper from "../components/EventsListWrapper/EventsListWrapper";
import { useState } from "react";

const UserScreen: React.FC = () => {
  const { events, error, loading } = useTypedSelector((state) => state.events);
  const { currentUser, isAuth } = useTypedSelector((state) => state.auth);
  const { fetchEventsLocation } = useActions();
  const { favoritesList }: any = currentUser;

  const [isDefaultList, setIsDefaultList] = useState(true);
  const [isFavoriteList, setIsFavoriteList] = useState(false);
  const [isPurchasedTicketsList, setIsPurchasedTicketsList] = useState(false);

  const chooseListView = (item: string) => {
    if (item === "default") {
      setIsDefaultList(true);
      setIsFavoriteList(false);
      setIsPurchasedTicketsList(false);
    }

    if (item === "favorite") {
      setIsDefaultList(false);
      setIsFavoriteList(true);
      setIsPurchasedTicketsList(false);
    }

    if (item === "purchased") {
      setIsDefaultList(false);
      setIsFavoriteList(false);
      setIsPurchasedTicketsList(true);
    }
  };

  useEffect(() => {
    fetchEventsLocation();
  }, []);

  if (loading) {
    return <h1>Идет загрузка</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!isAuth) {
    return <h1>Пользователь не авторизован</h1>;
  }

  return (
    <div className="user-screen">
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
          style={{ width: "30%", height: "30px" }}
          onClick={() => chooseListView("default")}
        >
          Все эвенты
        </button>
        <button
          className={
            isFavoriteList
              ? "event-list-action-btn-active"
              : "event-list-action-btn"
          }
          onClick={() => chooseListView("favorite")}
        >
          Избранное
        </button>
        <button style={{ width: "30%" }}>Купленные</button>
      </div>
      {isDefaultList && <EventsListWrapper events={events} />}
      {isFavoriteList && (
        <>
          {favoritesList.length > 0 ? (
            <EventsListWrapper events={favoritesList} />
          ) : (
            <h3 style={{ padding: "20px", textAlign: "center" }}>
              В избранном ничего нет :(
            </h3>
          )}
        </>
      )}
    </div>
  );
};

export default UserScreen;
