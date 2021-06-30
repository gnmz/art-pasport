import { Link } from "react-router-dom";

import Authefication from "../Authefication/Authefication";

const NavBar: React.FC = () => {
  return (
    <div
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#4285F4",
        padding: "20px",
        alignItems: "center",
      }}
    >
      <div
        className="logo"
        style={{ color: "#fff", fontWeight: 900, fontSize: "30px" }}
      >
        <Link to="/"> Art pass</Link>
      </div>

      <Authefication />
    </div>
  );
};

export default NavBar;
