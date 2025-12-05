import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        setError("Error al cargar las órdenes");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h2>Historial de órdenes</h2>
      {loading ? <p>Cargando...</p> : error ? <p style={{ color: "red" }}>{error}</p> : orders.length === 0 ? <p>No hay órdenes registradas.</p> : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f6f6f6" }}>
              <th>ID</th>
              <th>Comprador</th>
              <th>Email</th>
              <th>Total</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                <td><code>{order.id}</code></td>
                <td>{order.buyer?.name}</td>
                <td>{order.buyer?.email}</td>
                <td>${order.total?.toFixed(2)}</td>
                <td>{order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;