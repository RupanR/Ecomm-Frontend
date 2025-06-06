import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const isAdmin = user?.role?.toLowerCase() === "admin";
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-extrabold text-blue-600 tracking-wide"
        >
          🛒 E-Comm
        </Link>

        <div className="flex space-x-6 items-center text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition duration-300">
            Home
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className="hover:text-blue-600 transition duration-300"
            >
              Admin Panel
            </Link>
          )}

          {user && !isAdmin && (
            <Link
              to="/cart"
              className="hover:text-blue-600 transition duration-300"
            >
              Cart
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-600 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-blue-600 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;