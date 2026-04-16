import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import ProductList from "../components/ProductList";
import SellerOrders from "../components/SellerOrders";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "add";
  });
  const navigate = useNavigate();

  const { addProduct } = useProducts();
  const { logout } = useAuth();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    offerPrice: "",
    images: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      _id: Date.now().toString(),
      name: form.name,
      description: form.description.split(","),
      category: form.category,
      price: Number(form.price),
      offerPrice: Number(form.offerPrice),
      image: form.images.map((img) => (img ? URL.createObjectURL(img) : "")),
    };

    addProduct(newProduct);

    alert("Product Added");

    setForm({
      name: "",
      description: "",
      category: "",
      price: "",
      offerPrice: "",
      images: [],
    });
  };

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="w-64 bg-white border-r hidden md:block">
        <div className="p-4 border-b">
          <img src={assets.logo} alt="" />
        </div>

        <div className="p-3 space-y-2">
          <button
            onClick={() => setActiveTab("add")}
            className={`w-full text-left p-3 rounded ${
              activeTab === "add"
                ? "bg-green-100 border-l-4 border-green-500"
                : ""
            }`}
          >
            ➕ Add Product
          </button>

          <button
            onClick={() => setActiveTab("list")}
            className={`w-full text-left p-3 rounded ${
              activeTab === "list"
                ? "bg-green-100 border-l-4 border-green-500"
                : "hover:bg-gray-100"
            }`}
          >
            📋 Product List
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left p-3 rounded ${
              activeTab === "orders"
                ? "bg-green-100 border-l-4 border-green-500"
                : "hover:bg-gray-100"
            }`}
          >
            📦 Orders
          </button>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {activeTab === "add" && "Add Product"}
            {activeTab === "list" && "All Products"}
            {activeTab === "orders" && "Orders"}
          </h2>

          <div className="flex items-center gap-4">
            <p>Hi! Admin</p>
            <button onClick={handleLogout} className="border px-4 py-1 rounded">
              Logout
            </button>
          </div>
        </div>

        {activeTab === "add" && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow max-w-2xl"
          >
            <p className="font-medium mb-2">Product Image</p>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="file"
                  className="border p-2"
                  onChange={(e) => {
                    const newImages = [...form.images];
                    newImages[i] = e.target.files[0];
                    setForm({ ...form, images: newImages });
                  }}
                />
              ))}
            </div>

            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-2 mb-4 rounded"
            />

            <textarea
              placeholder="Description (comma separated)"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border p-2 mb-4 rounded h-28"
            />

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border p-2 mb-4 rounded"
            >
              <option value="">Select Category</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="drinks">Drinks</option>
              <option value="grains">Grains</option>
              <option value="bakery">Bakery</option>
              <option value="dairy">Dairy</option>
            </select>

            <div className="flex gap-4 mb-4">
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                placeholder="Offer Price"
                value={form.offerPrice}
                onChange={(e) =>
                  setForm({ ...form, offerPrice: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>

            <button className="bg-green-500 text-white px-6 py-2 rounded">
              ADD
            </button>
          </form>
        )}

        {activeTab === "list" && <ProductList />}

        {activeTab === "orders" && <SellerOrders />}
      </div>
    </div>
  );
};

export default SellerDashboard;
