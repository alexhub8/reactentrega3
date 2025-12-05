import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav className="navbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <h1 className="logo">Mi Tienda</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="links">
          <Link to="/">Inicio</Link>
          <Link to="/category/electronics">Electrónica</Link>
          <Link to="/category/fashion">Moda</Link>
          <Link to="/category/home">Hogar</Link>
        </div>
        <Link to="/cart"><CartWidget /></Link>
        <Link to="/orders" style={{ marginLeft: 8 }}>Órdenes</Link>
      </div>
    </nav>
  );
};

export default NavBar;
