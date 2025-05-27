import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    //fetch products
    axios
      .get("http://localhost:5000/api/products/getproducts")
      .then((res) => setProducts(res.data.data || []))
      .catch((err) => console.log("Unable to retrieve", err));

    //fetch cart (only if user logged in)
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
        return;
      }
      axios
        .get("http://localhost:5000/api/cart/view", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => setCartItems(res.data.data.items || []))
        .catch((err) => console.log("Unable to retrieve cart", err));
    }
  }, [user, navigate]);

  //Add to cart
  const addToCart = async (productId) => {
    if (!user) {
      alert("Please login to add items to the cart");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    await axios
      .post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then(() => {
        setCartItems([...cartItems, { product: { _id: productId } }]);
      })
      .catch(() => alert("Error in adding items to cart"));
  };

  //Remove from cart

  const removeFromCart = async (productId) => {
    await axios
      .delete(`http://localhost:5000/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        setCartItems(
          cartItems.filter((item) => item.product._id !== productId)
        );
      })
      .catch(() => alert("Error in removing items to cart"));
  };

  return <div></div>;
};

export default Home;
