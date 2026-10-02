import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext(null);

function read(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [favorites, setFavorites] = useState(() => read("funiro_favs", []));
  const [user, setUser] = useState(() => read("funiro_user", null));

  useEffect(() => {
    localStorage.setItem("funiro_favs", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (user) localStorage.setItem("funiro_user", JSON.stringify(user));
    else localStorage.removeItem("funiro_user");
  }, [user]);

  function toggleFavorite(product) {
    setFavorites((list) =>
      list.some((p) => p.id === product.id)
        ? list.filter((p) => p.id !== product.id)
        : [...list, product]
    );
  }

  function isFavorite(id) {
    return favorites.some((p) => p.id === id);
  }

  // Returns an error message, or "" when it worked
  function signup({ name, email, password }) {
    const users = read("funiro_users", []);
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return "This email is already registered";
    }
    users.push({ name, email, password });
    localStorage.setItem("funiro_users", JSON.stringify(users));
    setUser({ name, email });
    return "";
  }

  function login({ email, password }) {
    const users = read("funiro_users", []);
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return "Wrong email or password";
    setUser({ name: found.name, email: found.email });
    return "";
  }

  function logout() {
    setUser(null);
  }

  return (
    <StoreContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, user, signup, login, logout }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}