import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiArrowRight } from "react-icons/fi";
import ProductCard from "../components/productCard";
import heroImage from "../assets/frontHome.png";
import { ranges, rooms, galleryColumns } from "../data/products";
import "./home.css";

const HOME_COUNT = 8;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/furniture")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load products");
        return res.json();
      })
      .then((data) => setProducts(data.products || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // The API has 5 products, so we repeat them to show 8
  const homeProducts =
    products.length > 0
      ? Array.from(
          { length: HOME_COUNT },
          (_, i) => products[i % products.length]
        )
      : [];

  const visibleRooms = rooms.slice(slide);

  return (
    <div>
      {/* Hero */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-box">
          <p className="hero-small">New Arrival</p>
          <h1>
            Discover Our
            <br />
            New Collection
          </h1>
          <p className="hero-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <Link to="/shop" className="gold-btn">
            Buy Now
          </Link>
        </div>
      </section>

      {/* Browse the range */}
      <section className="range">
        <h2 className="section-title">Browse The Range</h2>
        <p className="section-sub">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="range-grid">
          {ranges.map((r) => (
            <Link to="/shop" className="range-item" key={r.id}>
              <img src={r.image} alt={r.name} />
              <h3>{r.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Our products */}
      <section className="products">
        <h2 className="section-title">Our Products</h2>

        {loading && <p className="home-msg">Loading...</p>}
        {error && <p className="home-msg">{error}</p>}

        <div className="products-grid">
          {homeProducts.map((p, i) => (
            <ProductCard key={`${p.id}-${i}`} product={p} />
          ))}
        </div>

        <div className="center">
          <Link to="/shop" className="outline-gold-btn">
            Show More
          </Link>
        </div>
      </section>

      {/* Rooms inspiration */}
      <section className="rooms">
        <div className="rooms-text">
          <h2>
            50+ Beautiful rooms
            <br />
            inspiration
          </h2>
          <p>
            Our designer already made a lot of beautiful prototipe of rooms
            that inspire you
          </p>
          <Link to="/shop" className="gold-btn small">
            Explore More
          </Link>
        </div>

        <div className="rooms-slider">
          <div className="rooms-track">
            {visibleRooms.map((room, i) => (
              <div
                key={room.id}
                className={i === 0 ? "room-card big" : "room-card"}
              >
                <img src={room.image} alt={room.title} />
                {i === 0 && (
                  <div className="room-caption">
                    <p>
                      0{room.id} <span className="dash" /> {room.type}
                    </p>
                    <h3>{room.title}</h3>
                    <button
                      className="room-arrow"
                      onClick={() =>
                        setSlide((s) => (s + 1) % rooms.length)
                      }
                      aria-label="Next room"
                    >
                      <FiArrowRight />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            className="slider-next"
            onClick={() => setSlide((s) => (s + 1) % rooms.length)}
            aria-label="Next"
          >
            <FiChevronRight />
          </button>

          <div className="dots">
            {rooms.map((room, i) => (
              <button
                key={room.id}
                className={i === slide ? "dot on" : "dot"}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery">
        <p className="gallery-small">Share your setup with</p>
        <h2 className="gallery-title">#FuniroFurniture</h2>

        <div className="gallery-wrap">
          {galleryColumns.map((col, i) => (
            <div className="g-col" key={i}>
              {col.map((img) => (
                <img
                  key={img.name}
                  className={`g-${img.name}`}
                  src={img.src}
                  alt={img.alt}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}