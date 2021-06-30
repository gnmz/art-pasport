import { Route } from "react-router-dom";

import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import DefaultScreen from "./screens/DefaultScreen";
import UserScreen from "./screens/UserScreen";
import CompanyScreen from "./screens/CompanyScreen";
import Login from "./components/Authefication/Login";
import Registration from "./components/Authefication/Registration";
import EventCard from "./components/EventCard/EventCard";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useActions } from "./hooks/useAction";
import { useEffect } from "react";

const App: React.FC = () => {
  const { isAuth, currentUser } = useTypedSelector((state) => state.auth);

  const { auth } = useActions();
  useEffect(() => {
    auth();
  }, []);

  const { role }: any = currentUser;

  return (
    <div className="app">
      <NavBar />

      {!isAuth && <Route path="/" exact component={DefaultScreen} />}

      {isAuth && role === "user" && (
        <Route path="/" exact component={UserScreen} />
      )}

      {isAuth && role === "company" && (
        <Route path="/" exact component={CompanyScreen} />
      )}

      <Route path="/login" exact component={Login} />
      <Route path="/registration" exact component={Registration} />
      <Route path="/exhibitions/:id" exact component={EventCard} />
    </div>
  );
};

export default App;
