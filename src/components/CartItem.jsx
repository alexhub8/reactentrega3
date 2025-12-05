import React from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeItem } = useCart();

  const handleRemove = () => removeItem(item.id);

  return (
    <div className="cart-item" style={{ display: "flex", justifyContent: "space-between", padding: 8, borderBottom: "1px solid #eee" }}>
      <div>
        <h4 style={{ margin: 0 }}>{item.name}</h4>
        <p style={{ margin: 0 }}>Precio unitario: ${item.price}</p>
        <p style={{ margin: 0 }}>Cantidad: {item.quantity}</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ margin: 0 }}><strong>Subtotal: ${ (item.price * (item.quantity || 0)).toFixed(2) }</strong></p>
        <button className="btn" onClick={handleRemove} style={{ marginTop: 8 }}>Eliminar</button>
      </div>
    </div>
  );
};

export default CartItem;
