import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
  setItems((prev) => {
    const found = prev.find((p) => p.id === product._id);

    if (found) {
      return prev.map((p) =>
        p.id === product._id
          ? { ...p, qty: p.qty + 1 }
          : p
      );
    }

    return [...prev, { ...product, id: product._id, qty: 1 }];
  });
};


  const removeItem = (id) => {
    setItems((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  const updateQty = (id, qty) => {

    if (qty <= 0) {
      removeItem(id);
      return;
    }

    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty } : p
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalAmount = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }, [items]);

  const totalItems = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.qty,
      0
    );
  }, [items]);

  const getItemQty = (id) => {
  const item = items.find((i) => i._id === id);
  return item ? item.qty : 0;
};

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalAmount,
        totalItems,
        getItemQty,
        setItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
