import { useState } from "react";
import { useActions } from "../../hooks/useAction";

const Login: React.FC = () => {
  const { login } = useActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('user')

  const loginHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const onChangeRole: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRole(e.target.value);
  }

  return (
    <div className="login">
      <h1>Авторизация</h1>
      <div className="login-role" onChange={onChangeRole}>
        <label>
          <span>Пользователь</span>
          <input type="radio" value="user" name="role" defaultChecked />
        </label>
        <label>
          <span>Компания</span>
          <input type="radio" value="company" name="role" />
        </label>
      </div>
      <div>
        <label>
          <span>Email:</span>
          <input type="text" value={email} onChange={loginHandler} />
        </label>
      </div>
      <div>
        <label>
          <span>Password:</span>
          <input type="text" value={password} onChange={passwordHandler} />
        </label>
      </div>
      <button className="login-sbmt" onClick={() => login(email, password, role)}>
        Войти
      </button>
    </div>
  );
};

export default Login;
