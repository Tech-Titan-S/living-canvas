import { Link } from "react-router-dom";

export default function Navbar({ onThemeClick }) {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">◒</span>
        <span>Living Canvas</span>
      </Link>

      <nav>
        <Link to="/">Home</Link>

         <Link to="/style">
          My Style
        </Link>

         <Link to="/color-lab">
          Color Lab
        </Link>

        <Link to="/customizer">
          Customizer
        </Link>

        <Link to="/planner">
          Planner
        </Link>

        <Link to="/budget">
          Budget
        </Link>

        <Link to="/marketplace">
          Market
        </Link>

<Link to="/saved-designs">
          Saved Designs
        </Link>
        
      </nav>

      <button
        className="nav-theme"
        onClick={onThemeClick}
      >
        Change Mood
      </button>
    </header>
  );
}