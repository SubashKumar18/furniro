import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiSearch, FiHeart, FiX } from "react-icons/fi";
import { useStore } from "../context/StoreContext";
import "./NavIcons.css";

const emptyForm = { name: "", email: "", password: "" };

export default function NavIcons() {
  const { favorites, user, login, signup, logout } = useStore();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setUserMenu(false);
        setAuthOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Search */
  function toggleSearch() {
    setSearchOpen((o) => !o);
    setUserMenu(false);
  }

  function submitSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/shop?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setQuery("");
  }

  /* User */
  function clickUser() {
    setSearchOpen(false);
    if (user) {
      setUserMenu((o) => !o);
    } else {
      openAuth("login");
    }
  }

  function openAuth(nextMode) {
    setMode(nextMode);
    setForm(emptyForm);
    setError("");
    setAuthOpen(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError("");
  }

  function submitAuth(e) {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password;

    if (mode === "signup" && !name) return setError("Name is required");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address");
    if (password.length < 6) return setError("Password must be at least 6 characters");

    const result =
      mode === "signup"
        ? signup({ name, email, password })
        : login({ email, password });

    if (result) return setError(result);
    setAuthOpen(false);
    setForm(emptyForm);
  }

  function handleLogout() {
    logout();
    setUserMenu(false);
  }

  return (
    <div className="nav-icons">
      {/* User */}
      <div className="ni-wrap">
        <button className="ni-btn" onClick={clickUser} aria-label="Account">
          <FiUser />
        </button>
        {user && userMenu && (
          <div className="ni-panel ni-user">
            <p className="ni-hello">Hi, {user.name}</p>
            <p className="ni-mail">{user.email}</p>
            <button className="ni-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="ni-wrap">
        <button className="ni-btn" onClick={toggleSearch} aria-label="Search">
          <FiSearch />
        </button>
        {searchOpen && (
          <form className="ni-panel ni-search" onSubmit={submitSearch}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" aria-label="Go">
              <FiSearch />
            </button>
          </form>
        )}
      </div>

      {/* Heart */}
      <Link to="/favorites" className="ni-btn" aria-label="Favorites">
        <FiHeart />
        {favorites.length > 0 && <span className="ni-badge">{favorites.length}</span>}
      </Link>

      {/* Login / Sign up box */}
      {authOpen &&
        createPortal(
          <div className="auth-overlay" onClick={() => setAuthOpen(false)}>
            <div className="auth-box" onClick={(e) => e.stopPropagation()}>
              <button
                className="auth-close"
                onClick={() => setAuthOpen(false)}
                aria-label="Close"
              >
                <FiX />
              </button>

              <h2>{mode === "login" ? "Login" : "Sign up"}</h2>

              <form onSubmit={submitAuth} noValidate>
                {mode === "signup" && (
                  <input
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                  />
                )}
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                />

                {error && <p className="auth-error">{error}</p>}

                <button type="submit" className="auth-submit">
                  {mode === "login" ? "Login" : "Create account"}
                </button>
              </form>

              <p className="auth-switch">
                {mode === "login" ? "No account yet?" : "Already have an account?"}{" "}
                <button onClick={() => openAuth(mode === "login" ? "signup" : "login")}>
                  {mode === "login" ? "Sign up" : "Login"}
                </button>
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}