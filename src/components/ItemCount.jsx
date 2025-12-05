import { useState } from "react";

const ItemCount = ({ stock = Infinity, initial = 1, onAdd }) => {
  const [count, setCount] = useState(() => (initial > 0 ? initial : 1));

  const handleAdd = () => setCount((c) => Math.min(c + 1, stock));
  const handleSubtract = () => setCount((c) => Math.max(c - 1, 1));

  const handleAddToCart = () => {
    if (stock <= 0) return;
    if (typeof onAdd === "function") onAdd(count);
  };

  return (
    <div className="item-count">
      <button onClick={handleSubtract} aria-label="restar">-</button>
      <span>{count}</span>
      <button onClick={handleAdd} aria-label="sumar">+</button>
      <button className="btn" onClick={handleAddToCart} disabled={stock <= 0}>
        {stock <= 0 ? "Sin stock" : "Agregar al carrito"}
      </button>
      <div style={{ marginTop: 8 }}>
        <small>Stock disponible: {isFinite(stock) ? stock : "ilimitado"}</small>
      </div>
    </div>
  );
};

export default ItemCount;
