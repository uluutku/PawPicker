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
            En Popüler Filmler ve Diziler
          </h2>
          <p className="hero-cta-card-description">
            RabbitFlix, en popüler filmleri ve dizileri sizin için bir araya
            getiren bir NetFlix klonu projesidir. Frontend becerilerini
            geliştirmek amacı ile yapılmış bu proje, The Movie Database API'ını
            kullanarak en popüler filmleri ve dizileri listeler.
          </p>
          <Link to="/movies">
            <button className="hero-cta-card-button-movie">
              Filmleri İncele
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingHero;
