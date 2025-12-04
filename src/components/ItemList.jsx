import React from 'react';
// IMPORTANTE: Aquí importamos el componente 'Item' que acabas de renombrar
import Item from "./Item"; 

const ItemList = ({ items }) => {
  return (
    <div className="catalogo">
      {/* Mapea el array 'items' y renderiza el componente 'Item' para cada uno */}
      {items.map((product) => (
        <Item key={product.id} item={product} /> 
      ))}
    </div>
  );
};

export default ItemList;