import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import Banner from "../components/banner";
import FeatureStrip from "../components/featurestrip";
import { useCart } from "../context/CartContext";
import "./compare.css";

function Stars({ rating }) {
  return (
    <span className="cmp-stars">
      {[1, 2, 3, 4, 5].map((n) => {
        if (rating >= n) return <FaStar key={n} />;
        if (rating >= n - 0.5) return <FaStarHalfAlt key={n} />;
        return <FaRegStar key={n} />;
      })}
    </span>
  );
}

// The table rows. Every value comes from the API product.
const sections = [
  {
    title: "General",
    rows: [
      ["Brand", (p) => p.brand || "-"],
      ["SKU", (p) => p.sku || "-"],
      ["Category", (p) => p.category || "-"],
      ["Tags", (p) => (p.tags || []).join(", ") || "-"],
      ["Rating", (p) => `${p.rating} / 5`],
      ["Availability", (p) => p.availabilityStatus || "-"],
    ],
  },
  {
    title: "Product",
    rows: [
      ["Price", (p) => `$${p.price.toFixed(2)}`],
      ["Discount", (p) => `${p.discountPercentage}%`],
      ["Stock", (p) => p.stock],
      ["Minimum Order", (p) => p.minimumOrderQuantity || 1],
    ],
  },
  {
    title: "Dimensions",
    rows: [
      ["Width", (p) => (p.dimensions ? `${p.dimensions.width} cm` : "-")],
      ["Height", (p) => (p.dimensions ? `${p.dimensions.height} cm` : "-")],
      ["Depth", (p) => (p.dimensions ? `${p.dimensions.depth} cm` : "-")],
      ["Weight", (p) => (p.weight ? `${p.weight} KG` : "-")],
    ],
  },
  {
    title: "Warranty",
    rows: [
      ["Warranty Summary", (p) => p.warrantyInformation || "-"],
      ["Shipping", (p) => p.shippingInformation || "-"],
      ["Return Policy", (p) => p.returnPolicy || "-"],
    ],
  },
];

const MAX = 3;

export default function Compare() {
  const { addToCart } = useCart();

  const [list, setList] = useState([]);
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/furniture")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load products");
        return res.json();
      })
      .then((data) => {
        const products = data.products || [];
        setList(products);
        setIds(products.slice(0, 2).map((p) => p.id));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const selected = ids
    .map((id) => list.find((p) => p.id === id))
    .filter(Boolean);
  const available = list.filter((p) => !ids.includes(p.id));

  function addProduct(e) {
    const id = Number(e.target.value);
    if (id && !ids.includes(id) && ids.length < MAX) {
      setIds([...ids, id]);
    }
  }

  function removeProduct(id) {
    setIds(ids.filter((x) => x !== id));
  }

  // Always 3 product slots, so the columns stay aligned
  const slots = Array.from({ length: MAX }, (_, i) => selected[i] || null);

  return (
    <div>
      <Banner title="Product Comparison" />

      <div className="cmp container">
        {loading && <p className="cmp-msg">Loading...</p>}
        {error && <p className="cmp-msg">{error}</p>}

        {!loading && !error && (
          <>
            {/* Top: intro + products + add a product */}
            <div className="cmp-head">
              <div className="cmp-intro">
                <h2>Go to Product page for more Products</h2>
                <Link to="/shop" className="cmp-more">
                  View More
                </Link>
              </div>

              {slots.map((p, i) =>
                p ? (
                  <div className="cmp-prod" key={p.id}>
                    <Link to={`/product/${p.id}`} className="cmp-img">
                      <img src={p.thumbnail} alt={p.title} />
                    </Link>
                    <h3>{p.title}</h3>
                    <p className="cmp-price">${p.price.toFixed(2)}</p>
                    <div className="cmp-rate">
                      <span>{p.rating.toFixed(1)}</span>
                      <Stars rating={p.rating} />
                      <span className="cmp-vbar" />
                      <small>{(p.reviews || []).length} Review</small>
                    </div>
                    {ids.length > 1 && (
                      <button
                        className="cmp-remove"
                        onClick={() => removeProduct(p.id)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ) : i === selected.length ? (
                  <div className="cmp-add" key={`add-${i}`}>
                    <h3>Add A Product</h3>
                    <div className="cmp-select">
                      <select value="" onChange={addProduct}>
                        <option value="" disabled>
                          Choose a Product
                        </option>
                        {available.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.title}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown />
                    </div>
                  </div>
                ) : (
                  <div key={`empty-${i}`} />
                )
              )}
            </div>

            {/* Table */}
            <div className="cmp-scroll">
              <div className="cmp-table">
                {sections.map((sec) => (
                  <div className="cmp-section" key={sec.title}>
                    <div className="cmp-row cmp-title-row">
                      <div className="cmp-cell">
                        <h3>{sec.title}</h3>
                      </div>
                      <div className="cmp-cell" />
                      <div className="cmp-cell" />
                      <div className="cmp-cell" />
                    </div>

                    {sec.rows.map(([label, getValue]) => (
                      <div className="cmp-row" key={label}>
                        <div className="cmp-cell cmp-label">{label}</div>
                        {slots.map((p, i) => (
                          <div className="cmp-cell" key={i}>
                            {p ? getValue(p) : ""}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}

                <div className="cmp-row cmp-cart-row">
                  <div className="cmp-cell" />
                  {slots.map((p, i) => (
                    <div className="cmp-cell" key={i}>
                      {p && (
                        <button
                          className="cmp-cart-btn"
                          onClick={() => addToCart(p, 1)}
                        >
                          Add To Cart
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <FeatureStrip />
    </div>
  );
}