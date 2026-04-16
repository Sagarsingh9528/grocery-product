import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";

const ProductList = () => {
  const { products } = useProducts();

  const [stock, setStock] = useState({});

  const toggleStock = (id) => {
    setStock((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-xl font-semibold mb-4">
        All Product
      </h2>

    
      <div className="grid grid-cols-4 font-medium text-gray-600 border-b pb-2">
        <p>Product</p>
        <p>Category</p>
        <p>Selling Price</p>
        <p className="text-center">In Stock</p>
      </div>

     
      {products.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-4 items-center border-b py-4"
        >

         
          <div className="flex items-center gap-4">
            <img
              src={item.image[0]}
              className="w-14 h-14 object-contain border p-2 rounded"
            />
            <p className="text-sm font-medium">
              {item.name}
            </p>
          </div>

          
          <p className="text-gray-500">{item.category}</p>

         
          <p className="font-medium">
            ₹{item.offerPrice}
          </p>

          {/* TOGGLE */}
          <div className="flex justify-center">
            <button
              onClick={() => toggleStock(item._id)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                stock[item._id]
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                  stock[item._id]
                    ? "translate-x-6"
                    : ""
                }`}
              />
            </button>
          </div>

        </div>
      ))}

    </div>
  );
};

export default ProductList;