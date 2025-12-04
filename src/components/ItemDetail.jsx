import ItemCount from "./ItemCount";

const ItemDetail = ({ product }) => {
  return (
    <div className="item-detail">
      <h2>{product.name}</h2>
      <p><strong>Categoría:</strong> {product.category}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Descripción:</strong> {product.description}</p>
      <ItemCount />
    </div>
  );
};

export default ItemDetail;
