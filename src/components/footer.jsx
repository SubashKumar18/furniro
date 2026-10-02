import { useState } from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setDone(true);
    setEmail("");
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>Funiro.</h2>
            <p className="footer-address">
              400 University Drive Suite 200 Coral Gables,
              <br />
              FL 33134 USA
            </p>
          </div>

          <div className="footer-col">
            <h3>Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Help</h3>
            <ul>
              <li><a href="#">Payment Options</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Privacy Policies</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Newsletter</h3>
            <form className="footer-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setDone(false);
                }}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
            {done && <p className="footer-thanks">Thank you for subscribing!</p>}
          </div>
        </div>

        <div className="footer-bottom">
          <p>2023 furino. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}