import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { user, dispatch, loading, error } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    const formData = {
      email: credentials.email,
      password: credentials.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: res.data.details, token: res.data.token },
      });
      navigate("/");
    } catch (err) {
      if (err.status === 400) {
        return window.confirm(`${err.response.data.message}`);
      }
      console.log(err);
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email: </label>
            <input
              type="email"
              name="email"
              placeholder="enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="enter your password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
