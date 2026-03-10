import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaNetworkWired } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`navbar flex w-full ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container max-w-[1200px] w-full flex justify-between items-center mx-auto px-6 h-[80px]">
        {/* LOGO */}
        <a href="#" className="nav-logo flex items-center gap-3" onClick={closeMenu}>
          <FaNetworkWired className="text-cyan text-3xl" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-wider leading-none">MOHAMED OUAKKAF</span>
            <span className="text-cyan text-xs tracking-[0.2em] mt-1">NETCLOUDDEV & INFRADEV</span>
          </div>
        </a>
        
        {/* HAMBURGER */}
        <div className="nav-icon lg:hidden cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </div>
        
        {/* MENU */}
        <ul className={`nav-menu lg:flex gap-8 items-center ${isOpen ? "active" : ""}`}>
          <li className="nav-item">
            <a href="#about" className="nav-links" onClick={closeMenu}>About</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-links" onClick={closeMenu}>Skills</a>
          </li>
          <li className="nav-item">
            <a href="#projects" className="nav-links" onClick={closeMenu}>Services</a>
          </li>
          <li className="nav-item">
            <a href="#projects" className="nav-links" onClick={closeMenu}>Projects</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-links" onClick={closeMenu}>Contact</a>
          </li>
          <li className="nav-item mt-4 lg:mt-0 lg:ml-4">
             <a href="#contact" className="text-white font-bold hover:text-cyan transition" onClick={closeMenu}>View My Resume</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;