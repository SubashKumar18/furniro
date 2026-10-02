import { Link, useLocation } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import bannerImg from "../assets/banner.png";
import plainImg from "../assets/gallery-desk.png";
import "./banner.css";

function GoldMark() {
  return (
    <svg
      className="banner-mark"
      width="50"
      height="32"
      viewBox="0 0 50 32"
      fill="none"
      stroke="#B88E2F"
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M3 30 L17 3 L25 17 L33 3 L47 30" />
      <path d="M13 30 L25 11 L37 30" />
    </svg>
  );
}

export default function Banner({ title }) {
  const { pathname } = useLocation();

  // The Shop image already has the text inside it
  if (pathname === "/shop") {
    return (
      <section
        className="banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <h1 className="sr-only">Shop</h1>
      </section>
    );
  }

  const first = pathname.split("/").filter(Boolean)[0] || "";
  const autoTitle = first.charAt(0).toUpperCase() + first.slice(1);
  const pageTitle = typeof title === "string" && title ? title : autoTitle;
  const crumbTitle = pathname === "/compare" ? "Comparison" : pageTitle;

  return (
    <section
      className="banner banner-blur"
      style={{ "--bg": `url(${plainImg})` }}
    >
      <GoldMark />
      <h1>{pageTitle}</h1>
      <div className="banner-crumb">
        <Link to="/">Home</Link>
        <FiChevronRight />
        <span>{crumbTitle}</span>
      </div>
    </section>
  );
}