import { useState } from "react";
import { useActions } from "../../hooks/useAction";

const Login: React.FC = () => {
  const { login } = useActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <h1>Авторизация</h1>
      <div>
        <label>
          <span>Логин:</span>
          <input type="text" value={email} onChange={loginHandler} />
        </label>
      </div>
      <div>
        <label>
          <span>Пароль:</span>
          <input type="text" value={password} onChange={passwordHandler} />
        </label>
      </div>
      <button className="login-sbmt" onClick={() => login(email, password)}>
        Войти
      </button>
    </div>
  );
};

export default Login;
