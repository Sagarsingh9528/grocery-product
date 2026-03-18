import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import toast from "react-hot-toast";

const AllProduct = () => {
  const { addItem, removeItem, updateQty, getItemQty } =
    useContext(CartContext);

  const { filteredProducts } = useProducts(); 

  return (
    <div className="mt-16 px-4 md:px-10">
      
     
      <div className="mb-6">
        <p className="text-2xl font-medium uppercase">ALL PRODUCTS</p>
        <div className="w-16 h-0.5 bg-green-500 rounded-full mt-1"></div>
      </div>

     

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {filteredProducts.map((product) => {
          const qty = getItemQty(product._id);

          return (
            <div
              key={product._id}
              className="bg-white border rounded-xl p-3 md:p-5 flex flex-col hover:shadow-md transition"
            >
              <img
                src={product.image[0]}
                alt={product.name}
                className="h-28 md:h-40 object-contain mb-2 md:mb-4"
              />

              <p className="text-xs md:text-sm text-gray-500">
                {product.category}
              </p>


              <h3 className="font-semibold text-sm md:text-lg line-clamp-2">
                {product.name}
              </h3>

             
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-green-600 font-semibold">
                    ₹{product.offerPrice}
                  </p>

                  <p className="text-gray-400 line-through text-sm">
                    ₹{product.price}
                  </p>
                </div>

              
                {qty === 0 ? (
                  <button
                    onClick={() => {
                      addItem(product);
                      toast.success("Added to cart 🛒");
                    }}
                    className="border border-green-500 text-green-600 px-3 py-1 rounded-lg text-sm hover:bg-green-50"
                  >
                    Add
                  </button>
                ) : (
                  <div className="flex items-center gap-2 border border-green-500 rounded-lg px-2 py-1">
                    
                   
                    <button
                      onClick={() => {
                        if (qty === 1) {
                          removeItem(product._id);
                          toast("Removed ❌");
                        } else {
                          updateQty(product._id, qty - 1);
                          toast.success("item remove ")
                        }
                      }}
                      className="text-lg px-2"
                    >
                      -
                    </button>

                   
                    <span className="text-sm font-medium w-5 text-center">
                      {qty}
                    </span>

                   
                    <button
                      onClick={() => {
                        updateQty(product._id, qty + 1);
                        toast.success("Updated 🔼");
                      }}
                      className="text-lg px-2"
                    >
                      +
                    </button>

                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProduct;