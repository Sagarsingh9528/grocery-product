import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";


const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("add");
  const navigate = useNavigate();
  

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

    console.log("Product:", form);
    alert("Product Added ✅");

    // reset
    setForm({
      name: "",
      description: "",
      category: "",
      price: "",
      offerPrice: "",
      images: [],
    });
  };

  

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="w-64 bg-white border-r hidden md:block">
        <div className="p-4 font-semibold text-lg border-b">
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
            className="w-full text-left p-3 rounded hover:bg-gray-100"
          >
            📋 Product List
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className="w-full text-left p-3 rounded hover:bg-gray-100"
          >
            📦 Orders
          </button>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {activeTab === "add" && "Add Product"}
          </h2>

          <div className="flex items-center gap-4">
            <p>Hi! Admin</p>
            <button onClick={()=> navigate('/')} className="border px-4 py-1 rounded">
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
              {[1, 2, 3, 4].map((i) => (
                <input
                  key={i}
                  type="file"
                  className="border p-2"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      images: [...form.images, e.target.files[0]],
                    })
                  }
                />
              ))}
            </div>

            <p className="mb-1">Product Name</p>
            <input
              type="text"
              placeholder="Type here"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-2 mb-4 rounded"
            />

            <p className="mb-1">Product Description</p>
            <textarea
              placeholder="Type here"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border p-2 mb-4 rounded h-28"
            />

            <p className="mb-1">Category</p>
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
              <option value="instant">Instant</option>
            </select>

            
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <p className="mb-1">Product Price</p>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="flex-1">
                <p className="mb-1">Offer Price</p>
                <input
                  type="number"
                  value={form.offerPrice}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      offerPrice: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>

            
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded"
            >
              ADD
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
