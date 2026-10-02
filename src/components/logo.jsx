import { Link } from "react-router-dom";
import "./logo.css";

export default function Logo() {
  return (
    <Link to="/" className="brand">
      <svg width="50" height="32" viewBox="0 0 50 32" aria-hidden="true">
        <path
          d="M2 30 L17 5 L32 30"
          fill="none"
          stroke="#B88E2F"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M15 30 L31 4 L48 30"
          fill="none"
          stroke="#B88E2F"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M12 30 L17 21 L22 30"
          fill="none"
          stroke="#B88E2F"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
      <span>Furniro</span>
    </Link>
  );
}