import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addItem = (item, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: Math.min((p.quantity || 0) + quantity, item.stock ?? Infinity) }
            : p
        );
      }
      return [...prev, { ...item, quantity: Math.min(quantity, item.stock ?? Infinity) }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const getItemCount = () => cart.reduce((sum, it) => sum + (it.quantity || 0), 0);

  const getTotal = () => cart.reduce((sum, it) => sum + (it.quantity || 0) * (it.price || 0), 0);

  const isInCart = (id) => cart.some((p) => p.id === id);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, getItemCount, getTotal, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
