import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { StoreProvider } from "./context/StoreContext";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import CartSidebar from "./components/cartSidebar";
import Home from "./Pages/home";
import Shop from "./Pages/shop";
import SingleProduct from "./Pages/singleProduct";
import Cart from "./Pages/cart";
import Checkout from "./Pages/checkout";
import Contact from "./Pages/contact";
import Blog from "./Pages/blog";
import Compare from "./Pages/compare";
import About from "./Pages/about";
import Favorites from "./Pages/favorites";

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/about" element={<About />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}