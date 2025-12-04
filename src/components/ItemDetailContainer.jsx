import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.find((p) => p.id === id));
      }, 800);
    });

    getProduct.then((res) => setProduct(res));
  }, [id]);

  return (
    <div className="container">
      {product ? <ItemDetail product={product} /> : <p>Cargando detalle...</p>}
    </div>
  );
};

export default ItemDetailContainer;
