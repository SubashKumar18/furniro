import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("furniro-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  // Save the cart in the browser, so it stays after refresh
  useEffect(() => {
    try {
      localStorage.setItem("furniro-cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  function addToCart(product, qty = 1) {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          qty,
        },
      ];
    });
    setIsOpen(true);
  }

  function setQty(id, qty) {
    const safe = Math.max(1, Number(qty) || 1);
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: safe } : i))
    );
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const value = {
    items,
    subtotal,
    count,
    isOpen,
    addToCart,
    setQty,
    removeItem,
    clearCart,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}