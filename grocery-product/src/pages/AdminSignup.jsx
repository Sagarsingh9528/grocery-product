import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("All fields required");
      return;
    }

    const success = signup(form.name, form.email, form.password);

    if (success) {
      toast.success("Signup successful 🎉");
      navigate("/login");
    } else {
      toast.error("User already exists ❌");
    }
  };

  return (
    <div className="mt-20 flex justify-center">
      <div className="border p-6 rounded w-80">

        <h2 className="text-xl font-semibold mb-4 text-center">
          Signup
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleSignup}
          className="bg-green-500 text-white w-full py-2 rounded"
        >
          Signup
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;