import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const MainBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full">
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block object-cover"
      />

      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden object-cover"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16">
        <h1 className="text-white text-2xl md:text-5xl font-bold max-w-xl leading-tight">
          Fresh Groceries Delivered in 10 Minutes 🚀
        </h1>

        <p className="text-white mt-4 text-sm md:text-lg max-w-md">
          Order fruits, vegetables, dairy & more at your doorstep.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 justify-center md:justify-start">
          <button className="bg-green-500 hover:bg-green-600 text-white px-5 md:px-8 py-3 rounded-lg font-semibold">
            Shop now
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="hidden md:flex group items-center gap-2 text-gray-800 font-medium hover:text-green-100"
          >
            Explore deals
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
