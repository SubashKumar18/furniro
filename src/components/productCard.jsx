import { Link } from "react-router-dom";
import { FiShare2, FiRepeat, FiHeart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useStore } from "../context/StoreContext";
import "./productCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useStore();

  const liked = isFavorite(product.id);
  const discount = Math.round(product.discountPercentage);
  const oldPrice = product.price / (1 - product.discountPercentage / 100);
  const tag = discount >= 5 ? `-${discount}%` : "New";

  function handleShare() {
    const link = `${window.location.origin}/product/${product.id}`;
    if (navigator.clipboard) navigator.clipboard.writeText(link);
    alert("Product link copied");
  }

  return (
    <div className="product-card">
      <span className={`tag ${tag === "New" ? "new" : "sale"}`}>{tag}</span>

      <Link to={`/product/${product.id}`} className="card-link">
        <img src={product.thumbnail} alt={product.title} />
        <div className="info">
          <h3>{product.title}</h3>
          <p className="desc">{product.description}</p>
          <div className="price">
            <strong>${product.price.toFixed(2)}</strong>
            {discount >= 5 && <del>${oldPrice.toFixed(2)}</del>}
          </div>
        </div>
      </Link>

      <div className="overlay">
        <button onClick={() => addToCart(product, 1)}>Add to cart</button>
        <div className="actions">
          <span onClick={handleShare} className="act">
            <FiShare2 /> Share
          </span>
          <Link to="/compare">
            <FiRepeat /> Compare
          </Link>
          <span
            onClick={() => toggleFavorite(product)}
            className={liked ? "act liked" : "act"}
          >
            <FiHeart /> {liked ? "Liked" : "Like"}
          </span>
        </div>
      </div>
    </div>
  );
}