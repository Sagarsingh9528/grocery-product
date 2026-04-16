import { createContext, useContext, useEffect, useState } from "react";

export const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const stored = localStorage.getItem("orders");
    return stored ? JSON.parse(stored) : [];
  });

  const [currentOrder, setCurrentOrder] = useState(null);

  
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  
  const placeOrder = (orderData) => {
    if (!orderData || !orderData.items?.length) return;

    const newOrder = {
      id: Date.now(),
      ...orderData, 
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
  };

  
  const updateOrderStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );

    setCurrentOrder((prev) =>
      prev?.id === id ? { ...prev, status } : prev
    );
  };

  
  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        placeOrder,
        updateOrderStatus,
        clearCurrentOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);