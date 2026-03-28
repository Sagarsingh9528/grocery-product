import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems = [], removeItem, updateQty } = useContext(CartContext);
  const navigate = useNavigate();

  // ✅ calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.offerPrice * item.qty,
    0
  );

  const tax = +(subtotal * 0.02).toFixed(1);
  const total = subtotal + tax;

  return (
    <div className="mt-16 px-4 md:px-10 grid md:grid-cols-3 gap-10">

      {/* LEFT SIDE */}
      <div className="md:col-span-2">

        <h1 className="text-2xl font-semibold mb-6">
          Shopping Cart{" "}
          <span className="text-green-500 text-sm">
            {cartItems.length} Items
          </span>
        </h1>

        <div className="space-y-6">

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-4"
            >

              {/* PRODUCT */}
              <div className="flex items-center gap-4">

                <img
                  src={item.image[0]}
                  className="w-20 h-20 object-contain border rounded"
                />

                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Weight: N/A</p>

                  {/* QTY */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        item.qty === 1
                          ? removeItem(item._id)
                          : updateQty(item._id, item.qty - 1)
                      }
                      className="px-2 border rounded"
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() =>
                        updateQty(item._id, item.qty + 1)
                      }
                      className="px-2 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>

              {/* PRICE */}
              <p className="font-medium">
                ₹{item.offerPrice * item.qty}
              </p>

              {/* REMOVE */}
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500 text-xl"
              >
                ✕
              </button>

            </div>
          ))}

        </div>

        {/* CONTINUE SHOPPING */}
        <button
          onClick={() => navigate("/products")}
          className="mt-6 text-green-600"
        >
          ← Continue Shopping
        </button>

      </div>

      {/* RIGHT SIDE */}
      <div className="bg-gray-100 p-6 rounded-lg">

        <h2 className="text-xl font-semibold mb-4">
          Order Summary
        </h2>

        {/* ADDRESS */}
        <div className="mb-4">
          <p className="font-medium">DELIVERY ADDRESS</p>
          <p className="text-sm text-gray-600">
            Your Address Here
          </p>
        </div>

        {/* PAYMENT */}
        <div className="mb-4">
          <p className="font-medium mb-1">PAYMENT METHOD</p>
          <select className="w-full border p-2 rounded">
            <option>Cash On Delivery</option>
            <option>Online Payment</option>
          </select>
        </div>

        {/* PRICE DETAILS */}
        <div className="space-y-2 text-sm border-t pt-4">

          <div className="flex justify-between">
            <span>Price</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-500">Free</span>
          </div>

          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>₹{tax}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg pt-2">
            <span>Total Amount:</span>
            <span>₹{total}</span>
          </div>

        </div>

        {/* BUTTON */}
        <button className="mt-6 w-full bg-green-500 text-white py-3 rounded hover:bg-green-600">
          Place Order
        </button>

      </div>

    </div>
  );
};

export default Cart;