import "./LandingHero.css";
import { Link } from "react-router-dom";

function LandingHero() {
  return (
    <div className="hero-main">
      <div className="hero-cta-card">
        <div className="hero-cta-card-title-container">
          <h1 className="hero-cta-card-title">PawPicker</h1>
          <h2 className="hero-cta-card-subtitle">
            Choose Your Images with Magic
          </h2>
          <p className="hero-cta-card-description">
            PawPicker simplifies your quest for the perfect image. Our
            enchanting wizard rabbit guides you through a magical A/B testing
            process. It’s an effortless way to make decisions and ensure your
            final choice is the crowd favorite.
          </p>
          <Link to="/tester">
            <button className="hero-cta-card-button-movie">
              Cast a Selection Spell
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingHero;
