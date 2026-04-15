import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useOrders } from "../context/OrderContext";

const Cart = () => {
  const {
    items = [],
    setItems,
    removeItem,
    updateQty,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const savedAddress = JSON.parse(localStorage.getItem("address"));

  const subtotal = (items || []).reduce(
    (acc, item) => acc + item.offerPrice * item.qty,
    0,
  );

  const tax = subtotal * 0.02;
  const total = subtotal + tax;
  const handlePlaceOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    if (!items || items.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      userId: user.id || "guest",
      items: items,
      total: total,
      payment: selectedPayment,
      date: new Date().toLocaleDateString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders]),
    );

    setItems([]);

    localStorage.removeItem("cart");

    toast.success("Order placed successfully 🎉");

    navigate("/my-orders");
  };

  return (
    <div className="mt-16 px-4 md:px-10 pb-24">
      <div className="grid lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">
            Shopping Cart{" "}
            <span className="text-green-600 text-sm">{items.length} Items</span>
          </h2>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>

              <p className="text-gray-500 mb-4">Add items to get started</p>

              <button
                onClick={() => navigate("/products")}
                className="bg-green-500 text-white px-6 py-2 rounded"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-3 text-gray-500 mb-4">
                <p>Product Details</p>
                <p className="text-center">Subtotal</p>
                <p className="text-center">Action</p>
              </div>

              {items.map((item) => (
                <div
                  key={item._id}
                  className="border-b py-4 flex flex-col md:grid md:grid-cols-3 gap-4 items-center"
                >
                  <div className="flex gap-4 items-center w-full">
                    <img
                      src={item.image?.[0]}
                      alt={item.name}
                      className="w-20 h-20 object-contain border rounded p-1"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium text-sm md:text-base">
                        {item.name}
                      </h3>

                      <p className="text-xs text-gray-500">Weight: N/A</p>

                      <div className="flex items-center border rounded mt-2 w-fit">
                        <button
                          onClick={() =>
                            item.qty > 1
                              ? updateQty(item._id, item.qty - 1)
                              : removeItem(item._id)
                          }
                          className="px-3 py-1 bg-gray-100"
                        >
                          -
                        </button>

                        <span className="px-3">{item.qty}</span>

                        <button
                          onClick={() => updateQty(item._id, item.qty + 1)}
                          className="px-3 py-1 bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-center font-medium">
                    ₹{item.offerPrice * item.qty}
                  </p>

                  <div className="flex justify-center w-full">
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => navigate("/products")}
                className="text-green-600 mt-6"
              >
                ← Continue Shopping
              </button>
            </>
          )}
        </div>

        <div className="bg-gray-100 p-6 rounded-lg h-fit lg:sticky lg:top-24">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <p className="font-medium mb-2">DELIVERY ADDRESS</p>

          {savedAddress ? (
            <div className="text-sm text-gray-600 mb-4">
              <p>
                {savedAddress.street}, {savedAddress.city}
              </p>
              <p>
                {savedAddress.state}, {savedAddress.country} -{" "}
                {savedAddress.zip}
              </p>
              <p>{savedAddress.phone}</p>

              <button
                onClick={() => navigate("/add-address")}
                className="text-green-600 text-sm mt-2"
              >
                Change
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/add-address")}
              className="text-green-600 mb-4"
            >
              + Add Address
            </button>
          )}
          
          <p className="font-medium mb-2">PAYMENT METHOD</p>

          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="w-full border p-2 mb-4 rounded"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="ONLINE">Online Payment</option>
          </select>

          <hr className="mb-4" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Price</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (2%)</span>
              <span>₹{tax.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="mt-4 text-lg font-semibold">
            Total: ₹{total.toFixed(1)}
          </h3>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-4 bg-green-500 text-white py-3 rounded"
          >
            Place Order
          </button>
        </div>
      </div>

      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center md:hidden shadow-lg">
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-semibold text-lg">₹{total.toFixed(1)}</p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
