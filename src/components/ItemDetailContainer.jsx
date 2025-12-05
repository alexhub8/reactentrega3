import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ItemDetail from "./ItemDetail";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        } else {
          setProduct(products.find((p) => p.id === id) || null);
        }
      } catch (err) {
        setProduct(products.find((p) => p.id === id) || null);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="container">
      {product ? <ItemDetail product={product} /> : <p>Cargando detalle...</p>}
    </div>
  );
};

export default ItemDetailContainer;
