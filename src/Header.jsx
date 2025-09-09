import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      {/* Use Link for navigation */}
      <Link to="/past-notes" className="pastBtn">
        Past Notes
      </Link>
      <h1 className="moodHead">EmoTracker</h1>
    </header>
  );
}
