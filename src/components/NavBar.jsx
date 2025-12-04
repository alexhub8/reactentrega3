import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Mi Tienda</h1>
      <div className="links">
        <Link to="/">Inicio</Link>
        <Link to="/category/electronics">Electrónica</Link>
        <Link to="/category/fashion">Moda</Link>
        <Link to="/category/home">Hogar</Link>
      </div>
    </nav>
  );
};

export default NavBar;
