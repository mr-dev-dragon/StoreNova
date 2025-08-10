import React, { useRef, useState } from "react";
import "../../styles/SectionHero.css"; // same CSS file
import heroVideo from "../../../public/assets/videos/hero.mp4"; // path unchanged

export default function HeroSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="hero-section">
      {/* Background video */}
      <video
        className="hero-video"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        ref={videoRef} // <-- video reference for control
      />

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Navbar */}
      <nav className="hero-navbar">
        <div className="logo">LOGO</div>
        <ul className="nav-links">
          <li>Shop</li>
          <li>Activities</li>
          <li>Explore</li>
        </ul>
        <div className="nav-icons">
          <span>🔍</span>
          <span>🛒</span>
          <span>👤</span>
        </div>
      </nav>

      {/* Hero content (bottom left now) */}
      <div className="hero-content bottom-left">
        <h1>Be every you with Zendaya</h1>
        <p>Bring all your sides along for the ride</p>
        <div className="hero-buttons">
          <button className="btn primary">Discover more</button>
          <button className="btn secondary">Shop the looks</button>
        </div>
      </div>

      {/* Video toggle button */}
      <button className="video-toggle-btn" onClick={toggleVideo}>
        {isPlaying ? "⏸" : "▶"}
      </button>
    </section>
  );
}
