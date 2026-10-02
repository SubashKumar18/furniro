import { NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import Logo from "./logo";
import { useCart } from "../context/CartContext";
import NavIcons from "./NavIcons";
import "./navbar.css";

export default function Navbar() {
  const { count, openCart } = useCart();

  return (
    <header className="navbar">
      <div className="nav-left">
        <Logo />
      </div>

      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <div className="nav-icons">
        <NavIcons />
        <button className="nav-cart" onClick={openCart} aria-label="Open cart">
          <FiShoppingCart />
          {count > 0 && <span className="nav-badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}