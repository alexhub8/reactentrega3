import React from "react";
import { useCart } from "../context/CartContext";

const CartWidget = () => {
  const { getItemCount } = useCart();
  const total = getItemCount();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
        alt="Carrito"
        style={{ width: "30px", marginRight: "10px" }}
      />
      <span>{total}</span>
    </div>
  );
};

export default CartWidget;
