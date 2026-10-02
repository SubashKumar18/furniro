import { Link } from "react-router-dom";
import Banner from "../components/banner";
import FeatureStrip from "../components/featurestrip";
import ProductCard from "../components/productCard";
import { useStore } from "../context/StoreContext";
import "./favorites.css";

export default function Favorites() {
  const { favorites } = useStore();

  return (
    <div>
      <Banner title="Favorites" />

      <section className="fav-wrap">
        {favorites.length === 0 ? (
          <div className="fav-empty">
            <p>You have no favorite products yet.</p>
            <Link to="/shop" className="fav-btn">
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="fav-grid">
            {favorites.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <FeatureStrip />
    </div>
  );
}