import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <div className="card">
      <h3>{item.name}</h3>
      <p>Precio: ${item.price}</p>
      <Link className="btn" to={`/item/${item.id}`}>
        Ver detalle
      </Link>
    </div>
  );
};

export default Item;
