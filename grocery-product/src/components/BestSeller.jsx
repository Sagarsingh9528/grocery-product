import React, { useContext } from "react";
import { assets, dummyProducts } from "../assets/assets";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

const BestSellers = () => {
  const { items, addItem, updateQty, removeItem } = useContext(CartContext);

  const bestProducts = dummyProducts.slice(0, 5);

  return (
    <section className="px-4 md:px-10 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">Best Sellers</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {bestProducts.map((product) => {
         
          const cartItem = items.find((item) => item.id === product._id);

          const qty = cartItem ? cartItem.qty : 0;

          return (
            <div
              key={product._id}
              className="bg-white rounded-xl border p-3 md:p-5 flex flex-col hover:shadow-md transition"
            >
              
              <img
                src={product.image[0]}
                alt={product.name}
                className="h-28 md:h-40 object-contain mb-2 md:mb-4"
              />

             
              <p className="text-xs md:text-sm text-gray-500">
                {product.category}
              </p>

             
              <h3 className="font-semibold text-sm md:text-lg mb-1 md:mb-2 line-clamp-2">
                {product.name}
              </h3>

             
              <div className="text-green-500 text-xs md:text-sm mb-2 md:mb-3">
                ★★★★☆ (4)
              </div>

             
              <div className="flex items-center justify-between mt-auto">
               
                <div>
                  <p className="text-green-600 text-base md:text-xl font-semibold">
                    ${product.offerPrice}
                  </p>

                  <p className="text-gray-400 line-through text-xs md:text-sm">
                    ${product.price}
                  </p>
                </div>

                
                {qty === 0 ? (
                  
                  <button
                    onClick={() => {
                      addItem(product);
                      toast.success("Item added 🛒");
                    }}
                    className="flex items-center justify-center gap-1 border border-green-500 text-green-600 px-3 py-2 text-sm rounded-lg hover:bg-green-50 min-w-[90px]"
                  >
                    <img src={assets.cart_icon} alt="" className="w-4 h-4" />
                    Add
                  </button>
                ) : (
                  
                  <div className="flex items-center justify-between border border-green-500 rounded-lg px-2 py-2 min-w-[90px]">
                    
                    <button
                      onClick={() => {
                        if (qty === 1) {
                          removeItem(product._id);
                          toast("Item removed");
                        } else {
                          updateQty(product._id, qty - 1);
                          toast("Quantity decreased");
                        }
                      }}
                      className="text-green-600 font-bold text-lg px-1"
                    >
                      −
                    </button>

                   
                    <span className="font-semibold text-sm">{qty}</span>

                  
                    <button
                      onClick={() => {
                        updateQty(product._id, qty + 1);
                        toast.success("Quantity increased");
                      }}
                      className="text-green-600 font-bold text-lg px-1"
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
    </section>
  );
};

export default BestSellers;
