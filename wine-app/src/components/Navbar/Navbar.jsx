import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import wineLogo from "/bottle-wine-icon.png";
import "./Navbar.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navBar">
      <Link to="/home" className="logo" onClick={closeMenu}>
        <img src={wineLogo} alt="Wine Logo" />
        <span className="logo-text">Wine Lab</span>
      </Link>

      <ul className="nav-links">
        <li>
          <NavLink to="/average" className="link">
            Average
          </NavLink>
        </li>

        <li>
          <NavLink to="/price" className="link">
            Price Vs Points{" "}
          </NavLink>
        </li>

        <li>
          <NavLink to="/topwines" className="link">
            {" "}
            Top Wines{" "}
          </NavLink>
        </li>

        <li>
          <NavLink to="/count" className="link">
            {" "}
            Wine Count{" "}
          </NavLink>
        </li>
      </ul>

      {/* Mobile menu button */}
      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile navigation */}
      <ul className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/average" className="link" onClick={closeMenu}>
            Average
          </NavLink>
        </li>

        <li>
          <NavLink to="/price" className="link" onClick={closeMenu}>
            Price vs Points
          </NavLink>
        </li>

        <li>
          <NavLink to="/topwines" className="link" onClick={closeMenu}>
            Top Wines
          </NavLink>
        </li>

        <li>
          <NavLink to="/count" className="link" onClick={closeMenu}>
            Wine Count
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
