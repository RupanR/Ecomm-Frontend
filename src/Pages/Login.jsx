import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      const userData = { ...res.data, role: res.data.role };
      login(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate(userData.role?.toLowerCase() === "admin" ? "/admin" : "/");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Welcome Back !</h2>
        <input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account?<a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
