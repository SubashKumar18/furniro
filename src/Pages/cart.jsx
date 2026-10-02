import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Banner from "../components/banner";
import FeatureStrip from "../components/featurestrip";
import { useCart } from "../context/CartContext";
import "./cart.css";

export default function Cart() {
  const { items, subtotal, setQty, removeItem } = useCart();

  return (
    <div>
      <Banner title="Cart" />

      <section className="cart-page container">
        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link to="/shop" className="cart-shop-btn">
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Left: table */}
            <div className="cart-table">
              <div className="cart-head">
                <span />
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span />
              </div>

              {items.map((item) => (
                <div className="cart-row" key={item.id}>
                  <Link to={`/product/${item.id}`} className="cart-img">
                    <img src={item.thumbnail} alt={item.title} />
                  </Link>

                  <span className="cart-name">{item.title}</span>
                  <span className="cart-price">${item.price.toFixed(2)}</span>

                  <div className="cart-qty">
                    <button
                      onClick={() => setQty(item.id, item.qty - 1)}
                      aria-label="Less"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => setQty(item.id, item.qty + 1)}
                      aria-label="More"
                    >
                      +
                    </button>
                  </div>

                  <span className="cart-sub">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>

                  <button
                    className="cart-del"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Right: totals */}
            <aside className="cart-totals">
              <h2>Cart Totals</h2>

              <div className="totals-row">
                <span>Subtotal</span>
                <span className="totals-grey">${subtotal.toFixed(2)}</span>
              </div>
              <div className="totals-row">
                <span>Total</span>
                <span className="totals-gold">${subtotal.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="totals-btn">
                Check Out
              </Link>
            </aside>
          </div>
        )}
      </section>

      <FeatureStrip />
    </div>
  );
}