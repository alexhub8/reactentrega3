import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart, clearCart, getTotal } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <div className="container">
        <h2>Carrito</h2>
        <p>El carrito está vacío.</p>
        <Link className="btn" to="/">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Carrito</h2>
      <div>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div style={{ marginTop: 16, textAlign: "right" }}>
        <h3>Total: ${getTotal().toFixed(2)}</h3>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button className="btn" onClick={clearCart}>Vaciar carrito</button>
          <Link className="btn" to="/checkout">Ir al checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
