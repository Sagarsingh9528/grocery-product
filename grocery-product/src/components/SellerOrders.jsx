import React from "react";
import { useOrders } from "../context/OrderContext";
import { assets } from "../assets/assets";

const SellerOrders = () => {
  const { orders } = useOrders();

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold mb-4">Orders List</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No Orders Yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >

          
            <div className="flex gap-4 items-center">

              <div className="w-16 h-16 bg-green-100 rounded flex items-center justify-center">
                <img src={assets.box_icon} alt="" />
              </div>

              <div>
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm">
                    {item.name}{" "}
                    <span className="text-green-600">
                      x {item.qty}
                    </span>
                  </p>
                ))}
              </div>
            </div>

           
            <div className="text-sm text-gray-600">
              <p className="font-medium">{order.address?.name}</p>
              <p>{order.address?.street}</p>
              <p>
                {order.address?.city}, {order.address?.state}
              </p>
              <p>{order.address?.country}</p>
            </div>

           
            <div className="font-semibold text-lg">
              ₹{order.total}
            </div>

           
            <div className="text-sm text-gray-600">
              <p>Method: {order.paymentMethod}</p>
              <p>Date: {order.date}</p>
              <p>Payment: {order.status}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerOrders;