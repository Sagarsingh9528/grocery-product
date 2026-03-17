import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = ({ onClose }) => {
  const { login } = useAuth(); 

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ name, email, password }); 

    onClose(); 
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >

      {/* MODAL */}
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()} 
        className="flex flex-col gap-4 w-[90%] sm:w-[360px] p-8 bg-white rounded-xl shadow-xl"
      >

       
        <p className="text-2xl font-semibold text-center">
          <span className="text-green-500">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

       
        {state === "register" && (
          <div>
            <p>Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded mt-1 outline-green-500"
              placeholder="Enter name"
              required
            />
          </div>
        )}

       
        <div>
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mt-1 outline-green-500"
            placeholder="Enter email"
            type="email"
            required
          />
        </div>

       
        <div>
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded mt-1 outline-green-500"
            placeholder="Enter password"
            type="password"
            required
          />
        </div>

       
        {state === "login" ? (
          <p className="text-sm">
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-green-500 cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-green-500 cursor-pointer"
            >
              click here
            </span>
          </p>
        )}

        
        <button className="bg-green-500 text-white py-2 rounded-lg">
          {state === "register" ? "Create Account" : "Login"}
        </button>

      </form>
    </div>
  );
};

export default Login;