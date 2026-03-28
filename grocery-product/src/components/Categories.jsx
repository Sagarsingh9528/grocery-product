import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../assets/assets";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 md:px-10 py-10">

      <h2 className="text-2xl md:text-3xl font-semibold mb-8">
        Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5 md:gap-6">

        {categories.map((cat) => (
          <div
            key={cat.path}
            onClick={() => {
              navigate(`/products/${cat.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
            style={{ backgroundColor: cat.bgColor }}
            className="rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 min-h-[170px]"
          >
            
            <img
              src={cat.image}
              alt={cat.text}
              className="h-20 md:h-24 object-contain mb-4"
            />

            <p className="text-center font-medium text-gray-700 text-sm md:text-base">
              {cat.text}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
};

export default Categories;