import { createContext, useContext, useEffect, useState } from "react";

export const OrderContext = createContext(null);

export function OrderProvider({ children }) {

  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      const parsed = JSON.parse(stored);
      setOrders(parsed);
      if (parsed.length > 0) setCurrentOrder(parsed[0]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (cartItems, totalAmount) => {
    if (!cartItems || cartItems.length === 0) return;

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      totalAmount,
      status: "PLACED",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
  };

  const updateOrderStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status } : o
      )
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
