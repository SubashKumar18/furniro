import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiSliders, FiGrid, FiList, FiChevronDown } from "react-icons/fi";
import Banner from "../components/banner";
import FeatureStrip from "../components/featurestrip";
import ProductCard from "../components/productCard";
import "./shop.css";

// The API has only 5 products, so we repeat them to fill 3 pages of 12
const TOTAL = 36;

export default function Shop() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim().toLowerCase();

  const [base, setBase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [perPage, setPerPage] = useState(12);
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const [view, setView] = useState("grid");

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/furniture")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load products");
        return res.json();
      })
      .then((data) => setBase(data.products || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Go back to page 1 when the search word changes
  useEffect(() => {
    setPage(1);
  }, [q]);

  // With a search word we show only the real matches (no repeating)
  let items = [];
  if (base.length > 0) {
    items = q
      ? base.filter((p) => p.title.toLowerCase().includes(q))
      : Array.from({ length: TOTAL }, (_, i) => base[i % base.length]);
  }

  const sorted = [...items];
  if (sort === "low") sorted.sort((a, b) => a.price - b.price);
  if (sort === "high") sorted.sort((a, b) => b.price - a.price);
  if (sort === "name") sorted.sort((a, b) => a.title.localeCompare(b.title));

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * perPage;
  const visible = sorted.slice(start, start + perPage);

  function changePerPage(e) {
    setPerPage(Number(e.target.value));
    setPage(1);
  }

  function changeSort(e) {
    setSort(e.target.value);
    setPage(1);
  }

  function goToPage(n) {
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <Banner title="Shop" />

      {/* Filter bar */}
      <section className="shop-bar">
        <div className="shop-bar-inner">
          <div className="bar-left">
            <button className="bar-filter">
              <FiSliders /> Filter
            </button>
            <button
              className={view === "grid" ? "bar-icon on" : "bar-icon"}
              onClick={() => setView("grid")}
              aria-label="Grid view"
            >
              <FiGrid />
            </button>
            <button
              className={view === "list" ? "bar-icon on" : "bar-icon"}
              onClick={() => setView("list")}
              aria-label="List view"
            >
              <FiList />
            </button>
            <span className="bar-line" />
            <span className="bar-text">
              {total > 0
                ? `Showing ${start + 1}–${start + visible.length} of ${total} results`
                : "No results"}
            </span>
          </div>

          <div className="bar-right">
            <label htmlFor="perPage">Show</label>
            <div className="bar-select small">
              <select id="perPage" value={perPage} onChange={changePerPage}>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
              </select>
              <FiChevronDown />
            </div>

            <label htmlFor="sort">Short by</label>
            <div className="bar-select">
              <select id="sort" value={sort} onChange={changeSort}>
                <option value="default">Default</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              <FiChevronDown />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="shop-wrap">
        {q && (
          <p className="shop-search">
            Search results for “{params.get("q")}” —{" "}
            <Link to="/shop">Clear search</Link>
          </p>
        )}

        {loading && <p className="shop-msg">Loading...</p>}
        {error && <p className="shop-msg">{error}</p>}
        {!loading && !error && total === 0 && (
          <p className="shop-msg">No products found.</p>
        )}

        <div className={view === "grid" ? "shop-grid" : "shop-grid list"}>
          {visible.map((p, i) => (
            <ProductCard key={`${current}-${i}-${p.id}`} product={p} />
          ))}
        </div>

        {/* Pagination: always visible */}
        <div className="shop-pages">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              className={n === current ? "pg on" : "pg"}
              onClick={() => goToPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            className="pg next"
            onClick={() => goToPage(current + 1)}
            disabled={current >= totalPages}
          >
            Next
          </button>
        </div>
      </section>

      <FeatureStrip />
    </div>
  );
}