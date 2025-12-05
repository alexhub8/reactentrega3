import React, { useState } from "react";
import { addDoc, collection, serverTimestamp, doc, runTransaction } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useCart } from "../context/CartContext";

const CheckoutForm = () => {
  const { cart, getTotal, clearCart } = useCart();
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => setBuyer({ ...buyer, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!buyer.name || !buyer.email) {
      setError("Completa nombre y email");
      return;
    }
    setLoading(true);
    try {
      await runTransaction(db, async (transaction) => {
        for (const cartItem of cart) {
          const prodRef = doc(db, "products", cartItem.id);
          const prodSnap = await transaction.get(prodRef);
          if (!prodSnap.exists()) {
            throw new Error(`Producto no encontrado: ${cartItem.name}`);
          }
          const currentStock = prodSnap.data().stock ?? Infinity;
          if (currentStock < cartItem.quantity) {
            throw new Error(`Stock insuficiente para ${cartItem.name}`);
          }
          transaction.update(prodRef, { stock: currentStock - cartItem.quantity });
        }
      });

      const order = {
        buyer,
        items: cart.map((it) => ({ id: it.id, name: it.name, price: it.price, quantity: it.quantity })),
        total: getTotal(),
        createdAt: serverTimestamp(),
      };

      const colRef = collection(db, "orders");
      const docRef = await addDoc(colRef, order);
      setOrderId(docRef.id);
      clearCart();
    } catch (err) {
      setError(err.message || "Error al generar la orden. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="container" style={{ textAlign: "center", marginTop: 40 }}>
        <div style={{ background: "#e6ffe6", border: "1px solid #b2ffb2", borderRadius: 8, padding: 24, display: "inline-block" }}>
          <h2 style={{ color: "#2e7d32" }}>¡Compra confirmada!</h2>
          <p>Gracias por tu compra, <strong>{buyer.name}</strong>.</p>
          <p>Recibirás un email a <strong>{buyer.email}</strong> con los detalles.</p>
          <p>Tu ID de orden es:</p>
          <pre style={{ background: "#f6f6f6", padding: 8, borderRadius: 4, fontSize: 18 }}>{orderId}</pre>
          <a href="/" className="btn" style={{ marginTop: 16, display: "inline-block" }}>Volver al inicio</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
          <div>
            <label>Nombre</label>
            <input name="name" value={buyer.name} onChange={handleChange} />
          </div>
          <div>
            <label>Email</label>
            <input name="email" value={buyer.email} onChange={handleChange} />
          </div>
          <div>
            <label>Teléfono</label>
            <input name="phone" value={buyer.phone} onChange={handleChange} />
          </div>

          <div style={{ marginTop: 12 }}>
            <p>Total a pagar: <strong>${getTotal().toFixed(2)}</strong></p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button className="btn" type="submit" disabled={loading}>{loading ? "Procesando..." : "Confirmar compra"}</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
