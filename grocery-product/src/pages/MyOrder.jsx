import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

  return (
    <div className="mt-16 px-4 md:px-10">

      
      <h2 className="text-2xl font-semibold mb-6 uppercase">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl p-5 md:p-6 bg-white shadow-sm"
            >

              <div className="flex flex-col md:flex-row md:justify-between text-sm text-gray-500 mb-4 gap-2">
                <p>
                  OrderId :{" "}
                  <span className="text-gray-700">
                    {order.id}
                  </span>
                </p>

                <p>
                  Payment :{" "}
                  <span className="text-gray-700">
                    {order.payment}
                  </span>
                </p>

                <p>
                  Total Amount :{" "}
                  <span className="text-gray-700">
                    ₹{order.total}
                  </span>
                </p>
              </div>

              {order.items?.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t pt-4"
                >

                  <div className="flex gap-4 items-center">

                    <img
                      src={item.image[0]}
                      className="w-20 h-20 object-contain bg-gray-100 p-2 rounded"
                    />

                    <div>
                      <h3 className="font-medium text-lg">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Category: {item.category}
                      </p>
                    </div>

                  </div>

                  <div className="text-sm text-gray-600">
                    <p>Quantity: {item.qty}</p>
                    <p>Status: Order Placed</p>
                    <p>Date: {order.date}</p>
                  </div>

                  
                  <div className="text-green-600 font-semibold text-lg">
                    Amount: ₹{item.offerPrice * item.qty}
                  </div>

                </div>
              ))}

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyOrders;