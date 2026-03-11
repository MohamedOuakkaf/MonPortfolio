import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.css";
import logo from "./logo.png";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

      <div className="nav-container">

        {/* LOGO */}
        <div className="logo">
          <img src={logo} alt="logo" />
          <span>Portfolio</span>
        </div>

        {/* MOBILE ICON */}
        <div className="nav-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={26}/> : <FaBars size={26}/>}
        </div>

        {/* MENU */}
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>

          <li className="nav-item">
            <a href="#about" className="nav-links" onClick={closeMenu}>
              About
            </a>
          </li>

          <li className="nav-item">
            <a href="#skills" className="nav-links" onClick={closeMenu}>
              Skills
            </a>
          </li>

          <li className="nav-item">
            <a href="#services" className="nav-links" onClick={closeMenu}>
              Services
            </a>
          </li>

          <li className="nav-item">
            <a href="#projects" className="nav-links" onClick={closeMenu}>
              Projects
            </a>
          </li>

          <li className="nav-item">
            <a href="#contact" className="nav-links" onClick={closeMenu}>
              Contact
            </a>
          </li>

          <li className="nav-item resume">
            <a href="#contact" onClick={closeMenu}>
              View Resume
            </a>
          </li>

        </ul>

      </div>

    </nav>
  );
};

export default Navbar;