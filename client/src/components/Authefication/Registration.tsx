import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../config";

const Registration: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const firstNameHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFirstName(e.target.value);
  };

  const emailHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const onChangeRole: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRole(e.target.value);
  };

  const registration = async () => {
    const newUser = {
      firstName: firstName,
      email: email,
      password: password,
      role: role,
    };
    try {
      let respnose = await axios.post(`${API_URL}reg`, newUser);
      alert(respnose.data.message);
    } catch (error) {}
  };

  return (
    <div className="registration">
      <h1>Регистрация</h1>
      <div className="regstration-role" onChange={onChangeRole}>
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
        {role === "user" && (
          <div>
            <label>
              <span>Name</span>
              <input
                type="text"
                value={firstName}
                onChange={firstNameHandler}
              />
            </label>
          </div>
        )}
        <div>
          <label>
            <span>Email</span>
            <input type="text" value={email} onChange={emailHandler} />
          </label>
        </div>
        <div>
          <label>
            <span>Password</span>
            <input type="text" value={password} onChange={passwordHandler} />
          </label>
        </div>
      </div>
      <button
        onClick={registration}
        className="login-sbmt"
        style={{ width: "150px" }}
      >
        Зарегестрироваться
      </button>
    </div>
  );
};

export default Registration;
