import React, { useContext } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import {
  FaCar,
  FaHome,
  FaHeartbeat,
  FaBuilding,
  FaUsers,
  FaShieldAlt,
  FaPlus,
} from "react-icons/fa";

export default function Dashboard() {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaCar />,
      title: "Auto Insurance",
      desc: "Complete vehicle protection with affordable premiums.",
    },
    {
      icon: <FaHome />,
      title: "Home Insurance",
      desc: "Protect your dream home against every uncertainty.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Health Insurance",
      desc: "Smart healthcare plans for individuals & families.",
    },
    {
      icon: <FaBuilding />,
      title: "Business Insurance",
      desc: "Secure your business assets and employees.",
    },
    {
      icon: <FaUsers />,
      title: "Dental Insurance",
      desc: "Affordable dental plans with maximum benefits.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Life Insurance",
      desc: "Protect your family's future with trusted plans.",
    },
  ];

  return (
    <div className={`dashboard-container ${isDarkMode ? "dark" : "light"}`}>
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div>
          <h1>Insurance Management Dashboard</h1>
          <p>
            Manage policies, customers and insurance services with a modern
            dashboard.
          </p>

          <button
            className="add-btn"
            onClick={() => navigate("/category-policy-form")}
          >
            <FaPlus /> Add Policy
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h2>560+</h2>
            <span>Policies</span>
          </div>

          <div className="stat-card">
            <h2>120+</h2>
            <span>Customers</span>
          </div>

          <div className="stat-card">
            <h2>98%</h2>
            <span>Claim Success</span>
          </div>

          <div className="stat-card">
            <h2>24/7</h2>
            <span>Support</span>
          </div>
        </div>
      </motion.div>

      <section className="services">
        <h2>Our Insurance Services</h2>

        <div className="service-grid">
          {services.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                rotateX: -8,
                rotateY: 8,
                scale: 1.06,
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="service-card"
            >
              <div className="icon">{item.icon}</div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
