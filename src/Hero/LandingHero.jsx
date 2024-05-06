import React from "react";
import "./LandingHero.css";
import { Link } from "react-router-dom";

function LandingHero() {
  return (
    <div className="hero-main">
      <div className="hero-cta-card">
        <div className="hero-cta-card-title-container">
          <h1 className="hero-cta-card-title">PawSelect</h1>
          <h2 className="hero-cta-card-subtitle">
            Select Your Image with Magic
          </h2>
          <p className="hero-cta-card-description">
            PawPicker simplifies your quest for the perfect image. Instead of overwhelming choices, our enchanting wizard rabbit guides you through a magical A/B testing process. Just choose the better of two images, and continue selecting until you uncover the best one. It’s an effortless way to make decisions and ensure your final choice is the crowd favorite.
          </p>
          <Link to="/movies">
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
