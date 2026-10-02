import { Link } from "react-router-dom";
import { FaTrophy, FaShieldAlt, FaTruck } from "react-icons/fa";
import Banner from "../components/banner";
import FeatureStrip from "../components/featurestrip";
import storyImg from "../assets/room-1.png";
import diningImg from "../assets/gallery-dining.png";
import livingImg from "../assets/range-living.png";
import "./about.css";

const stats = [
  { number: "10+", label: "Years of experience" },
  { number: "5,000+", label: "Happy customers" },
  { number: "200+", label: "Furniture designs" },
  { number: "24 / 7", label: "Customer support" },
];

const values = [
  {
    icon: <FaTrophy />,
    title: "High Quality",
    text: "Every piece is made from top materials and checked by hand before it leaves our workshop.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Warranty Protection",
    text: "All our furniture comes with a 2 year warranty, so you can buy with confidence.",
  },
  {
    icon: <FaTruck />,
    title: "Free Shipping",
    text: "Orders over 150 $ are delivered to your door for free, safely packed.",
  },
];

export default function About() {
  return (
    <div>
      <Banner title="About" />

      {/* Our story */}
      <section className="ab-story container">
        <div className="ab-text">
          <p className="ab-small">Our Story</p>
          <h2>We make homes feel like home</h2>
          <p>
            Furniro started with a simple idea: good furniture should be
            beautiful, comfortable, and fair in price. Our designers work with
            skilled craftsmen to create pieces that fit modern homes.
          </p>
          <p>
            From a small sofa to a full dining room, we choose every material
            with care. We want you to enjoy your space for many years.
          </p>
          <Link to="/shop" className="ab-btn">
            Explore Our Shop
          </Link>
        </div>

        <div className="ab-photos">
          <img src={storyImg} alt="Beautiful room" className="ab-photo-big" />
          <img src={diningImg} alt="Dining room" className="ab-photo-small" />
        </div>
      </section>

      {/* Numbers */}
      <section className="ab-stats">
        <div className="container ab-stats-grid">
          {stats.map((s) => (
            <div className="ab-stat" key={s.label}>
              <h3>{s.number}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="ab-mission container">
        <img src={livingImg} alt="Living room" />
        <div className="ab-text">
          <p className="ab-small">Our Mission</p>
          <h2>Design that lasts</h2>
          <p>
            We believe furniture is not only something you use. It is the place
            where you rest, eat, work, and spend time with people you love. Our
            mission is to give every home furniture that is simple, strong, and
            made to last.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="ab-values container">
        <h2>Why choose Furniro</h2>
        <div className="ab-values-grid">
          {values.map((v) => (
            <div className="ab-value" key={v.title}>
              <span className="ab-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <FeatureStrip />
    </div>
  );
}
