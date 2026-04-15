import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { login, user } = useAuth(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    const success = login(email, password);

    if (success) {
      toast.success("Login successful ✅");

      const currentUser =
        JSON.parse(localStorage.getItem("authUser")) || user;

      if (currentUser?.role === "admin") {
        navigate("/seller"); 
      } else {
        navigate("/"); 
      }
    } else {
      toast.error("Invalid credentials ❌");
    }
  };

  return (
    <div className="mt-20 flex justify-center">
      <div className="border p-6 rounded w-80 shadow-sm">

        <h2 className="text-xl font-semibold mb-4 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded transition"
        >
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;