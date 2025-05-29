import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Access denied ! Redirecting...");
      navigate("/");
      return;
    }

    Promise.all([
      axios.get("http://localhost:5000/api/products/getproducts", {
        headers: { Authorization: `Bearer ${user.token}` },
      }),
      axios.get("http://localhost:5000/api/order/allorders", {
        headers: { Authorization: `Bearer ${user.token}` },
      }),
    ])
      .then(([prodcutsRes, orderRes]) => {
        setProducts(prodcutsRes.data.data || []);
        setOrders(orderRes.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user, navigate]);

  //Adding the product
  const handleAddProduct = async () => {
    await axios
      .post("http://localhost:5000/api/products/create", newProduct, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setProducts([...products, res.data]);
        setNewProduct({ name: "", price: "", description: "", stock: "" });
        alert("Products Added Successfully");
      })
      .catch(() => alert("Error in adding product"));
  };

  //getting details of the product
  const handleEdit = (product) => {
    setEditId(product._id);
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
    });
  };

  //edit product
  const handleUpdateProduct = async () => {
    await axios
      .put(`http://localhost:5000/api/products/update/${editId}`, newProduct, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        const updated = products.map((p) =>
          p._id === editId ? res.data.data : p
        );
        setProducts(updated);
        setEditId(null);
        setNewProduct({ name: "", price: "", description: "", stock: "" });
        alert("Product Updated");
      })
      .catch(() => alert("Error in Updating product"));
  };


  //delete product
 


  //update status 



  return <div></div>;
};

export default AdminDashboard;
