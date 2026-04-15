import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

const AddAddress = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("address"));
    if (saved) setForm(saved);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("address", JSON.stringify(form));
    toast.success("Address saved ✅");
    navigate("/cart");
  };

  return (
    <div className="mt-16 px-4 md:px-10 grid md:grid-cols-2 gap-10">

     
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Add Shipping <span className="text-green-500">Address</span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 rounded"/>
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2 rounded"/>
        </div>

        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded w-full mt-3"/>

        <input name="street" value={form.street} onChange={handleChange} placeholder="Street" className="border p-2 rounded w-full mt-3"/>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 rounded"/>
          <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="border p-2 rounded"/>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <input name="zip" value={form.zip} onChange={handleChange} placeholder="Zip" className="border p-2 rounded"/>
          <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="border p-2 rounded"/>
        </div>

        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded w-full mt-3"/>

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-green-500 text-white py-3 rounded"
        >
          SAVE ADDRESS
        </button>
      </div>

      
      <div className="hidden md:flex items-center justify-center">
        <img src={assets.add_address_iamge} className="w-80"/>
      </div>

    </div>
  );
};

export default AddAddress;