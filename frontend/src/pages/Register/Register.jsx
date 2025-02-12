import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { user, dispatch, loading, error } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });

    const formData = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.user });
      navigate("/login");
    } catch (err) {
      console.log(err);
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="enter your name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="enter your passowrd"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registser</button>
      </form>
    </div>
  );
};

export default Register;
