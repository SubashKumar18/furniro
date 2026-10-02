import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useStore } from "../context/StoreContext";
import "./HeartButton.css";

export default function HeartButton({ product }) {
  const { isFavorite, toggleFavorite } = useStore();
  const on = isFavorite(product.id);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  }

  return (
    <button
      className={on ? "heart-btn on" : "heart-btn"}
      onClick={handleClick}
      aria-label={on ? "Remove from favorites" : "Add to favorites"}
    >
      {on ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}