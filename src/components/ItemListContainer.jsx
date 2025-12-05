import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ItemList from "./ItemList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const colRef = collection(db, "products");
        const snapshot = await getDocs(colRef);
        const itemsFromDB = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        const filtered = categoryId ? itemsFromDB.filter((p) => p.category === categoryId) : itemsFromDB;
        if (itemsFromDB.length === 0) {
          setItems(categoryId ? products.filter((p) => p.category === categoryId) : products);
        } else {
          setItems(filtered);
        }
      } catch (err) {
        setItems(categoryId ? products.filter((p) => p.category === categoryId) : products);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="container">
      <h2>{categoryId ? `Categoría: ${categoryId}` : "Catálogo de productos"}</h2>
      {loading ? <p>Cargando productos...</p> : <ItemList items={items} />}
    </div>
  );
};

export default ItemListContainer;
