import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import "./Navbar.css";
import confetti from "canvas-confetti";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cvClicked, setCvClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fonction confetti
  const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#10b981", "#34d399", "#fbbf24", "#60a5fa", "#f87171"],
    });
  };

  const handleCvClick = () => {
    setCvClicked(true);
    launchConfetti(); // lance la célébration
    setTimeout(() => setCvClicked(false), 1000); // reset style après 1s
  };

  const links = [
    { name: "About", color: "#f87171" },
    { name: "Skills", color: "#34d399" },
    { name: "Services", color: "#60a5fa" },
    { name: "Projects", color: "#fbbf24" },
    { name: "Contact", color: "#a78bfa" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <div className="navbar-left">
        <a href="#" className="logo">
          <img src={logo} alt="logo" />
        </a>
      </div>

      {/* Menu */}
      <div className="navbar-center">
        {links.map((link) => (
          <a
            key={link.name}
            href={`#${link.name.toLowerCase()}`}
            className="nav-link"
            style={{ "--hover-color": link.color } as React.CSSProperties}
          >
            {link.name}
            <span className="underline" style={{ backgroundColor: link.color }}></span>
          </a>
        ))}
      </div>

      {/* CV Button */}
      <div className="navbar-right">
        <a
          href="/path/to/your_resume_en.pdf"
          download
          onClick={handleCvClick}
          className={`cv-button ${cvClicked ? "clicked" : ""}`}
        >
          View My Resume
        </a>
      </div>
    </nav>
  );
}

export default Navbar;