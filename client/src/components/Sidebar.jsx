import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""} ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
      style={{ background: isDarkMode ? "#11101d" : "#252222" }}
    >
      <div className="logo-details">
        <div className="logo_name">coversphere</div>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
      </div>

      {/* Theme toggle icon */}
      <div className="theme-toggle" onClick={toggleTheme}>
        <i className={`bx ${isDarkMode ? "bx-sun" : "bx-moon"}`}></i>
      </div>

      {/* Navigation list */}
      <ul className="nav-list">
        <li>
          <Link to="/">
            <i className="bx bx-grid-alt"></i>
            <span className="links_name">Dashboard</span>
          </Link>
          <span className="tooltip">Dashboard</span>
        </li>

        <li>
          <Link to="/client-detail">
            <i class="bx bxs-user-detail"></i>
            <span className="links_name">Client Detail</span>
          </Link>
          <span className="tooltip">Client Detail</span>
        </li>
        <li>
          <Link to="/category-policy">
            <i class="bx bx-category"></i>
            <span className="links_name">Category of Policy</span>
          </Link>
          <span className="tooltip">Category of Policy</span>
        </li>
        <li>
          <Link to="/policy">
            <i className="bx bx-cog"></i>
            <span className="links_name">Policy</span>
          </Link>
          <span className="tooltip">Policy</span>
        </li>

        {/* Profile section */}
        {user ? (
          <>
            <li
              className="profile"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              <div className="profile-details">
                <div className="name_job">
                  <div className="name">{user.name}</div>
                  <div className="job">{user.email}</div>
                </div>
              </div>
              <i className="bx bx-log-out" id="log_out"></i>
            </li>
          </>
        ) : (
          <>
            {" "}
            <li className="profile" style={{ cursor: "pointer" }}>
              <div className="profile-details">
                <div className="name_job">
                  <div className="name">Cover Sphere</div>
                  <div className="job">@coversphere</div>
                </div>
              </div>
              <i className="bx bx-log-out" id="log_out"></i>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
