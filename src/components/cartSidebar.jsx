import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { FaTimesCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "./cartSidebar.css";

export default function CartSidebar() {
  const { items, subtotal, isOpen, closeCart, removeItem } = useCart();

  return (
    <>
      <div
        className={isOpen ? "cs-overlay show" : "cs-overlay"}
        onClick={closeCart}
      />

      <aside className={isOpen ? "cs-panel open" : "cs-panel"}>
        <div className="cs-head">
          <h2>Shopping Cart</h2>
          <button onClick={closeCart} aria-label="Close cart">
            <FiShoppingBag />
          </button>
        </div>

        <div className="cs-list">
          {items.length === 0 && <p className="cs-empty">Your cart is empty.</p>}

          {items.map((item) => (
            <div className="cs-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <div className="cs-info">
                <p className="cs-title">{item.title}</p>
                <p className="cs-line">
                  {item.qty} <span>X</span> <b>${item.price.toFixed(2)}</b>
                </p>
              </div>
              <button
                className="cs-remove"
                onClick={() => removeItem(item.id)}
                aria-label="Remove item"
              >
                <FaTimesCircle />
              </button>
            </div>
          ))}
        </div>

        <div className="cs-subtotal">
          <span>Subtotal</span>
          <b>${subtotal.toFixed(2)}</b>
        </div>

        <div className="cs-buttons">
          <Link to="/cart" onClick={closeCart}>Cart</Link>
          <Link to="/checkout" onClick={closeCart}>Checkout</Link>
          <Link to="/compare" onClick={closeCart}>Comparison</Link>
        </div>
      </aside>
    </>
  );
}