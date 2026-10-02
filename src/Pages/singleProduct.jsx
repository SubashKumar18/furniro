import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronRight, FiPlus } from "react-icons/fi";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import ProductCard from "../components/productCard";
import { useCart } from "../context/CartContext";
import "./singleProduct.css";

function Stars({ rating }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((n) => {
        if (rating >= n) return <FaStar key={n} />;
        if (rating >= n - 0.5) return <FaStarHalfAlt key={n} />;
        return <FaRegStar key={n} />;
      })}
    </span>
  );
}

export default function SingleProduct() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allFurniture, setAllFurniture] = useState([]);

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("L");
  const [color, setColor] = useState("#816DFA");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const [liked, setLiked] = useState(false);

  // Related products: the furniture list (runs one time)
  useEffect(() => {
    fetch("https://dummyjson.com/products/category/furniture")
      .then((res) => res.json())
      .then((data) => setAllFurniture(data.products || []))
      .catch(() => setAllFurniture([]));
  }, []);

  // The product itself (runs again when the id changes)
  useEffect(() => {
    setLoading(true);
    setError(null);
    setActiveImg(0);
    setQty(1);
    setTab("description");
    setLiked(false);
    window.scrollTo(0, 0);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="sp-msg">Loading...</p>;
  if (error || !product) return <p className="sp-msg">{error || "Error"}</p>;

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];
  const reviews = product.reviews || [];
  const relatedList = allFurniture
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const colors = ["#816DFA", "#000000", "#B88E2F"];
  const sizes = ["L", "XL", "XS"];

  return (
    <div>
      {/* Breadcrumb bar */}
      <section className="crumb-bar">
        <div className="crumb">
          <Link to="/">Home</Link>
          <FiChevronRight />
          <Link to="/shop">Shop</Link>
          <FiChevronRight />
          <span className="bar" />
          <strong>{product.title}</strong>
        </div>
      </section>

      {/* Top part */}
      <section className="sp-top">
        <div className="sp-gallery">
          <div className="thumbs">
            {images.slice(0, 4).map((src, i) => (
              <button
                key={i}
                className={i === activeImg ? "thumb on" : "thumb"}
                onClick={() => setActiveImg(i)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
          <div className="main-img">
            <img src={images[activeImg]} alt={product.title} />
          </div>
        </div>

        <div className="sp-info">
          <h1>{product.title}</h1>
          <p className="sp-price">${product.price.toFixed(2)}</p>

          <div className="rating-row">
            <Stars rating={product.rating} />
            <span className="vbar" />
            <span className="review-count">
              {reviews.length} Customer Review
            </span>
          </div>

          <p className="sp-short">{product.description}</p>

          <p className="label">Size</p>
          <div className="sizes">
            {sizes.map((s) => (
              <button
                key={s}
                className={s === size ? "size on" : "size"}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <p className="label">Color</p>
          <div className="colors">
            {colors.map((c) => (
              <button
                key={c}
                className={c === color ? "color on" : "color"}
                style={{ background: c }}
                onClick={() => setColor(c)}
                aria-label={c}
              />
            ))}
          </div>

          <div className="buy-row">
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button
              className="outline-btn"
              onClick={() => addToCart(product, qty)}
            >
              Add To Cart
            </button>
            <Link to="/compare" className="outline-btn">
              <FiPlus /> Compare
            </Link>
          </div>

          <hr />

          <table className="meta">
            <tbody>
              <tr>
                <td>SKU</td>
                <td>: {product.sku || "-"}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>: {product.category}</td>
              </tr>
              <tr>
                <td>Tags</td>
                <td>: {(product.tags || []).join(", ")}</td>
              </tr>
              <tr>
                <td>Share</td>
                <td>
                  <div className="share">
                    <span>:</span>
                    <FaFacebook />
                    <FaLinkedin />
                    <FaTwitter />
                    <button
                      className="sp-heart"
                      onClick={() => setLiked((v) => !v)}
                      aria-label="Like"
                    >
                      {liked ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tabs */}
      <section className="sp-tabs">
        <div className="tab-head">
          <button
            className={tab === "description" ? "on" : ""}
            onClick={() => setTab("description")}
          >
            Description
          </button>
          <button
            className={tab === "info" ? "on" : ""}
            onClick={() => setTab("info")}
          >
            Additional Information
          </button>
          <button
            className={tab === "reviews" ? "on" : ""}
            onClick={() => setTab("reviews")}
          >
            Reviews [{reviews.length}]
          </button>
        </div>

        <div className="tab-body">
          {tab === "description" && (
            <>
              <p>{product.description}</p>
              <p>
                Brand: {product.brand || "Furniro"}.{" "}
                {product.warrantyInformation}. {product.shippingInformation}.
              </p>
            </>
          )}

          {tab === "info" && (
            <ul className="info-list">
              <li><span>Brand</span> {product.brand || "-"}</li>
              <li><span>Weight</span> {product.weight} kg</li>
              <li>
                <span>Dimensions</span>{" "}
                {product.dimensions
                  ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`
                  : "-"}
              </li>
              <li><span>Warranty</span> {product.warrantyInformation}</li>
              <li><span>Shipping</span> {product.shippingInformation}</li>
              <li><span>Availability</span> {product.availabilityStatus}</li>
            </ul>
          )}

          {tab === "reviews" && (
            <div className="review-list">
              {reviews.length === 0 && <p>No reviews yet.</p>}
              {reviews.map((r, i) => (
                <div className="review" key={i}>
                  <strong>{r.reviewerName}</strong>
                  <Stars rating={r.rating} />
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="two-imgs">
          <div className="box">
            <img src={images[0]} alt="" />
          </div>
          <div className="box">
            <img src={images[1] || images[0]} alt="" />
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="related container">
        <h2>Related Products</h2>
        <div className="related-grid">
          {relatedList.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <Link to="/shop" className="show-more">Show More</Link>
      </section>
    </div>
  );
}