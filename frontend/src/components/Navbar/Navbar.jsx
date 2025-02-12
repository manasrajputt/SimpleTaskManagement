import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { user, token, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>
        <Link className="logo" to="/">Task Management</Link>
      </h2>
      <div>
        {token ? (
          <div className="navbar-Items">
            <p>{user.name}</p>
            <button onClick={handleClick}>Logout</button>
          </div>
        ) : (
          <div className="navbar-Items">
            <button>
              <Link className="registerbtn" to="/register">Register</Link>
            </button>
            <button>
              <Link className="loginbtn" to="/login">Login</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
