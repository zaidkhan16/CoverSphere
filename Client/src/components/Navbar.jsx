import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarStyle = {
    backgroundColor: isDarkMode ? "#11101d" : "#252222",
    color: isDarkMode ? "#ffffff" : "#000000",
  };

  return (
    <nav className="navbar" style={navbarStyle}>
      <div className="navbar-container">
        <button className="menu-toggle" onClick={toggleMenu}>
          <i className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"}`}></i>
        </button>

        {/* Navbar Links */}
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {user ? (
            <>
              {" "}
              <div className="auth-buttons">
                <li>
                  <span
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      height: "38px",
                    }}
                    className="welcome-text"
                  >
                    Welcome, {user.name.toUpperCase()}
                  </span>
                </li>
                <li>
                  <button className="logout-btn" onClick={logout}>
                    Logout
                  </button>
                </li>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="auth-buttons">
                <li>
                  <Link to="/signin" className="login-btn">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="signup-btn">
                    Sign Up
                  </Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
