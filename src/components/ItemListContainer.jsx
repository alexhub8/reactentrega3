import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ItemList from "./ItemList";

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getData = new Promise((resolve) => {
      setTimeout(() => {
        resolve(categoryId ? products.filter(p => p.category === categoryId) : products);
      }, 800);
    });

    getData.then((res) => {
      setItems(res);
      setLoading(false);
    });
  }, [categoryId]);

  return (
    <div className="container">
      <h2>{categoryId ? `Categoría: ${categoryId}` : "Catálogo de productos"}</h2>
      {loading ? <p>Cargando productos...</p> : <ItemList items={items} />}
    </div>
  );
};

export default ItemListContainer;
