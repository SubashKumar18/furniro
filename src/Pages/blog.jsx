import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaUser, FaCalendarAlt, FaTag } from "react-icons/fa";
import Banner from "../components/banner";
import FeatureStrip from "../components/featurestrip";
import { blogPosts } from "../data/blog";
import "./blog.css";

const PER_PAGE = 3;

export default function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState([]);

  // Categories with counts
  const categoryNames = [...new Set(blogPosts.map((p) => p.category))].sort();
  const counts = categoryNames.map((name) => ({
    name,
    count: blogPosts.filter((p) => p.category === name).length,
  }));

  // Search + category filter
  const filtered = blogPosts.filter((p) => {
    const okCategory = !category || p.category === category;
    const okSearch = p.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    return okCategory && okSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice(
    (current - 1) * PER_PAGE,
    current * PER_PAGE
  );

  function goToPage(n) {
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function changeCategory(name) {
    setCategory(category === name ? "" : name);
    setPage(1);
  }

  function changeSearch(e) {
    setQuery(e.target.value);
    setPage(1);
  }

  function toggleOpen(id) {
    setOpen((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    );
  }

  return (
    <div>
      <Banner title="Blog" />

      <section className="blog container">
        {/* Left: posts */}
        <div className="blog-main">
          {visible.length === 0 && (
            <p className="blog-none">No posts found.</p>
          )}

          {visible.map((post) => (
            <article className="post" key={post.id}>
              <img src={post.image} alt={post.title} />

              <div className="post-meta">
                <span><FaUser /> {post.author}</span>
                <span><FaCalendarAlt /> {post.date}</span>
                <span><FaTag /> {post.category}</span>
              </div>

              <h2>{post.title}</h2>
              <p className={open.includes(post.id) ? "post-text open" : "post-text"}>
                {post.text}
              </p>

              <button
                className="read-more"
                onClick={() => toggleOpen(post.id)}
              >
                {open.includes(post.id) ? "Read less" : "Read more"}
              </button>
            </article>
          ))}

          {totalPages > 1 && (
            <div className="blog-pages">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={n === current ? "pg on" : "pg"}
                  onClick={() => goToPage(n)}
                >
                  {n}
                </button>
              ))}
              {current < totalPages && (
                <button className="pg next" onClick={() => goToPage(current + 1)}>
                  Next
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right: sidebar */}
        <aside className="blog-side">
          <div className="blog-search">
            <input
              type="text"
              value={query}
              onChange={changeSearch}
              aria-label="Search posts"
            />
            <FiSearch />
          </div>

          <h3>Categories</h3>
          <ul className="blog-cats">
            {counts.map((c) => (
              <li key={c.name}>
                <button
                  className={category === c.name ? "on" : ""}
                  onClick={() => changeCategory(c.name)}
                >
                  <span>{c.name}</span>
                  <span>{c.count}</span>
                </button>
              </li>
            ))}
          </ul>

          <h3 className="recent-title">Recent Posts</h3>
          <ul className="blog-recent">
            {blogPosts.slice(0, 5).map((p) => (
              <li key={p.id}>
                <img src={p.image} alt="" />
                <div>
                  <p>{p.title}</p>
                  <small>03 Aug 2022</small>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <FeatureStrip />
    </div>
  );
}