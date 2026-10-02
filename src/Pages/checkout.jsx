import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import Banner from "../components/banner";
import FeatureStrip from "../components/featurestrip";
import { useCart } from "../context/CartContext";
import "./checkout.css";

const countries = [
  "Sri Lanka",
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
];

const provinces = [
  "Western Province",
  "Central Province",
  "Southern Province",
  "Northern Province",
  "Eastern Province",
  "North Western Province",
  "North Central Province",
  "Uva Province",
  "Sabaragamuwa Province",
];

const emptyForm = {
  firstName: "",
  lastName: "",
  company: "",
  country: "Sri Lanka",
  street: "",
  city: "",
  province: "Western Province",
  zip: "",
  phone: "",
  email: "",
  info: "",
};

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState("bank");
  const [orderId, setOrderId] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  }

  function validate() {
    const er = {};
    if (!form.firstName.trim()) er.firstName = "First name is required";
    if (!form.lastName.trim()) er.lastName = "Last name is required";
    if (!form.street.trim()) er.street = "Street address is required";
    if (!form.city.trim()) er.city = "Town / City is required";
    if (!form.province.trim()) er.province = "Province is required";
    if (!form.zip.trim()) er.zip = "ZIP code is required";
    if (!form.phone.trim()) {
      er.phone = "Phone is required";
    } else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) {
      er.phone = "Enter a valid phone number";
    }
    if (!form.email.trim()) {
      er.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      er.email = "Enter a valid email address";
    }
    return er;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length > 0) return;

    setOrderId(Math.floor(100000 + Math.random() * 900000));
    clearCart();
    setForm(emptyForm);
    window.scrollTo(0, 0);
  }

  // After the order is placed
  if (orderId) {
    return (
      <div>
        <Banner title="Checkout" />
        <section className="co-done container">
          <h2>Thank you! Your order is placed.</h2>
          <p>Your order number is #{orderId}.</p>
          <Link to="/shop" className="co-btn">
            Continue Shopping
          </Link>
        </section>
        <FeatureStrip />
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div>
        <Banner title="Checkout" />
        <section className="co-done container">
          <h2>Your cart is empty.</h2>
          <p>Add a product first, then come back to checkout.</p>
          <Link to="/shop" className="co-btn">
            Go to Shop
          </Link>
        </section>
        <FeatureStrip />
      </div>
    );
  }

  function Field({ label, name, type = "text", wide = true }) {
    return (
      <div className={wide ? "co-field" : "co-field half"}>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          value={form[name]}
          onChange={handleChange}
          className={errors[name] ? "bad" : ""}
        />
        {errors[name] && <span className="co-error">{errors[name]}</span>}
      </div>
    );
  }

  return (
    <div>
      <Banner title="Checkout" />

      <form className="co container" onSubmit={handleSubmit} noValidate>
        {/* Left: billing details */}
        <div className="co-left">
          <h2>Billing details</h2>

          <div className="co-two">
            <div className="co-field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className={errors.firstName ? "bad" : ""}
              />
              {errors.firstName && (
                <span className="co-error">{errors.firstName}</span>
              )}
            </div>
            <div className="co-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className={errors.lastName ? "bad" : ""}
              />
              {errors.lastName && (
                <span className="co-error">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="co-field">
            <label htmlFor="company">Company Name (Optional)</label>
            <input
              id="company"
              name="company"
              value={form.company}
              onChange={handleChange}
            />
          </div>

          <div className="co-field">
            <label htmlFor="country">Country / Region</label>
            <div className="co-select">
              <select
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
              >
                {countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <FiChevronDown />
            </div>
          </div>

          <div className="co-field">
            <label htmlFor="street">Street address</label>
            <input
              id="street"
              name="street"
              value={form.street}
              onChange={handleChange}
              className={errors.street ? "bad" : ""}
            />
            {errors.street && <span className="co-error">{errors.street}</span>}
          </div>

          <div className="co-field">
            <label htmlFor="city">Town / City</label>
            <input
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              className={errors.city ? "bad" : ""}
            />
            {errors.city && <span className="co-error">{errors.city}</span>}
          </div>

          <div className="co-field">
            <label htmlFor="province">Province</label>
            {form.country === "Sri Lanka" ? (
              <div className="co-select">
                <select
                  id="province"
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                >
                  {provinces.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
                <FiChevronDown />
              </div>
            ) : (
              <input
                id="province"
                name="province"
                value={form.province === "Western Province" ? "" : form.province}
                onChange={handleChange}
                className={errors.province ? "bad" : ""}
              />
            )}
            {errors.province && (
              <span className="co-error">{errors.province}</span>
            )}
          </div>

          <div className="co-field">
            <label htmlFor="zip">ZIP code</label>
            <input
              id="zip"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              className={errors.zip ? "bad" : ""}
            />
            {errors.zip && <span className="co-error">{errors.zip}</span>}
          </div>

          <div className="co-field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={errors.phone ? "bad" : ""}
            />
            {errors.phone && <span className="co-error">{errors.phone}</span>}
          </div>

          <div className="co-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "bad" : ""}
            />
            {errors.email && <span className="co-error">{errors.email}</span>}
          </div>

          <div className="co-field co-info">
            <input
              name="info"
              placeholder="Additional information"
              value={form.info}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Right: order summary */}
        <div className="co-right">
          <div className="co-sum-head">
            <h3>Product</h3>
            <h3>Subtotal</h3>
          </div>

          {items.map((item) => (
            <div className="co-sum-row" key={item.id}>
              <span className="co-grey">
                {item.title} <b>x</b> {item.qty}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}

          <div className="co-sum-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="co-sum-row">
            <span>Total</span>
            <span className="co-total">${subtotal.toFixed(2)}</span>
          </div>

          <hr />

          <label className="co-radio">
            <input
              type="radio"
              name="payment"
              checked={payment === "bank"}
              onChange={() => setPayment("bank")}
            />
            <span className="dot" />
            Direct Bank Transfer
          </label>

          {payment === "bank" && (
            <p className="co-pay-text">
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference. Your order will not be shipped
              until the funds have cleared in our account.
            </p>
          )}

          <label className="co-radio">
            <input
              type="radio"
              name="payment"
              checked={payment === "cod"}
              onChange={() => setPayment("cod")}
            />
            <span className="dot" />
            Cash On Delivery
          </label>

          <p className="co-privacy">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <b>privacy policy.</b>
          </p>

          <div className="co-order-wrap">
            <button type="submit" className="co-order">
              Place order
            </button>
          </div>
        </div>
      </form>

      <FeatureStrip />
    </div>
  );
}