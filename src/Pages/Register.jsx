import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", userData);
      alert("Registration Successful please proceed to login");
      navigate("/login");
    } catch (error) {
      alert("Error in Registering User");
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <h2>Create an Account</h2>
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter Your password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <button type="submit">Register</button>
        <p>
          Already have an account?<a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
