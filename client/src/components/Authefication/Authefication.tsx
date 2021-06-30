import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import "./Authefication.css";

const Authefication: React.FC = () => {
  const { isAuth, currentUser }:any = useTypedSelector((state) => state.auth);
  const { logout } = useActions();
  return (
    <div
      className="authefication"
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "230px",
      }}
    >
      {!isAuth ? (
        <>
          <Link to="/login" className="authefication-btn">
            Войти
          </Link>
          <Link to="/registration" className="authefication-btn">
            Регистрация
          </Link>
        </>
      ) : (
        <>
          <p>Добро пожаловать {currentUser.firstName}</p>
          <button onClick={logout} className="authefication-btn">
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Authefication;
