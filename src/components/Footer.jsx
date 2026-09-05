import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <h2>
          Living Canvas<span>.</span>
        </h2>

        <p>
          Turn your imagination into a place
          you can live in.
        </p>
      </div>

      <div className="footer-column">
        <h4>Explore</h4>

        <Link to="/customizer">
          Room Customizer
        </Link>

        <Link to="/planner">
          2D Planner
        </Link>

        <Link to="/style">
          Find My Style
        </Link>

        <Link to="/marketplace">
          Marketplace
        </Link>
      </div>

      <div className="footer-column">
        <h4>Tools</h4>

        <Link to="/style">
          Style Quiz
        </Link>

        <Link to="/planner">
          Room Planner
        </Link>

        <Link to="/customizer">
          Design Canvas
        </Link>

        <Link to="/color-lab">
          Color Lab
        </Link>
      </div>
    </footer>
  );
}