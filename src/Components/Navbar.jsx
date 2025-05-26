import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const isAdmin = user?.role?.toLowerCase() === "admin";
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
   // navigate("/login")
  }
  return (
    <nav>
      <div>
        <Link to={"/"}>🛍️EComm</Link>
        <div>
          <Link to={"/"}>Home</Link>
          {isAdmin && <Link to={"/admin"}>Admin Panel</Link>}
          {user && !isAdmin && <Link to={"/cart"}>Cart</Link>}
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
