import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import Banner from "../components/banner";
import FeatureStrip from "../components/featurestrip";
import "./contact.css";

const emptyForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
    setSent(false);
  }

  function validate() {
    const er = {};
    if (!form.name.trim()) er.name = "Name is required";
    if (!form.email.trim()) {
      er.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      er.email = "Enter a valid email address";
    }
    if (!form.message.trim()) {
      er.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      er.message = "Message must be at least 10 characters";
    }
    return er;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length > 0) return;

    setSent(true);
    setForm(emptyForm);
  }

  return (
    <div>
      <Banner title="Contact" />

      <section className="ct container">
        <h2 className="ct-title">Get In Touch With Us</h2>
        <p className="ct-sub">
          For More Information About Our Product &amp; Services. Please Feel
          Free To Drop Us An Email. Our Staff Always Be There To Help You Out.
          Do Not Hesitate!
        </p>

        <div className="ct-grid">
          {/* Left: info */}
          <div className="ct-info">
            <div className="ct-item">
              <FaMapMarkerAlt className="ct-icon" />
              <div>
                <h3>Address</h3>
                <p>236 5th SE Avenue, New York NY10000, United States</p>
              </div>
            </div>

            <div className="ct-item">
              <FaPhoneAlt className="ct-icon" />
              <div>
                <h3>Phone</h3>
                <p>Mobile: +(84) 546-6789</p>
                <p>Hotline: +(84) 456-6789</p>
              </div>
            </div>

            <div className="ct-item">
              <FaClock className="ct-icon" />
              <div>
                <h3>Working Time</h3>
                <p>Monday-Friday: 9:00 - 22:00</p>
                <p>Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <form className="ct-form" onSubmit={handleSubmit} noValidate>
            <div className="ct-field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                placeholder="Abc"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? "bad" : ""}
              />
              {errors.name && <span className="ct-error">{errors.name}</span>}
            </div>

            <div className="ct-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Abc@def.com"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "bad" : ""}
              />
              {errors.email && <span className="ct-error">{errors.email}</span>}
            </div>

            <div className="ct-field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                placeholder="This is an optional"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="ct-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Hi! i’d like to ask about"
                value={form.message}
                onChange={handleChange}
                className={errors.message ? "bad" : ""}
              />
              {errors.message && (
                <span className="ct-error">{errors.message}</span>
              )}
            </div>

            <button type="submit" className="ct-submit">
              Submit
            </button>

            {sent && (
              <p className="ct-success">
                Thank you! Your message was sent. We will reply soon.
              </p>
            )}
          </form>
        </div>
      </section>

      <FeatureStrip />
    </div>
  );
}