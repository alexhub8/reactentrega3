import { useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";

const ItemDetail = ({ product }) => {
  const { addItem, isInCart } = useCart();
  const [addedQty, setAddedQty] = useState(0);

  const handleAdd = (qty) => {
    const quantity = Math.max(1, Math.floor(qty));
    addItem(product, quantity);
    setAddedQty(quantity);
  };

  return (
    <div className="item-detail">
      <h2>{product.name}</h2>
      <p><strong>Categoría:</strong> {product.category}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Descripción:</strong> {product.description}</p>

      {product.stock === 0 ? (
        <p style={{ color: "red" }}>Producto sin stock</p>
      ) : addedQty > 0 || isInCart(product.id) ? (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <p>Agregaste {addedQty > 0 ? addedQty : "al carrito"} unidad(es).</p>
          <Link className="btn" to="/cart">Ir al carrito</Link>
          <Link className="btn" to="/">Seguir comprando</Link>
        </div>
      ) : (
        <ItemCount stock={product.stock ?? Infinity} initial={1} onAdd={handleAdd} />
      )}
    </div>
  );
};

export default ItemDetail;
