import { FiAward, FiCheckCircle, FiPackage, FiHeadphones } from "react-icons/fi";
import "./featurestrip.css";

const features = [
  { icon: <FiAward />, title: "High Quality", text: "crafted from top materials" },
  { icon: <FiCheckCircle />, title: "Warranty Protection", text: "Over 2 years" },
  { icon: <FiPackage />, title: "Free Shipping", text: "Order over 150 $" },
  { icon: <FiHeadphones />, title: "24 / 7 Support", text: "Dedicated support" },
];

export default function FeatureStrip() {
  return (
    <section className="feature-strip">
      {features.map((item) => (
        <div className="feature" key={item.title}>
          <span className="icon">{item.icon}</span>
          <div>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}