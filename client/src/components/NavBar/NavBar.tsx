import { Link } from "react-router-dom";

import "./NavBar.css";

import Authefication from "../Authefication/Authefication";

const NavBar: React.FC = () => {
  return (
    <div
      className="navbar"
    >
      <div
        className="logo"
      >
        <Link to="/"> Art pass</Link>
      </div>

      <Authefication />
    </div>
  );
};

export default NavBar;
