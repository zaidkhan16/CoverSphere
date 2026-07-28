import React, { useContext } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  FaCar,
  FaHome,
  FaHeartbeat,
  FaBuilding,
  FaUsers,
  FaShieldAlt,
  FaPlus,
  FaUserPlus,
  FaClipboardList,
  FaWallet,
  FaFileInvoiceDollar,
  FaArrowUp,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function Dashboard() {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const stats = [
    {
      title: "Policies",
      value: 560,
      icon: <FaClipboardList />,
      color: "#4F46E5",
      change: "+12%",
    },
    {
      title: "Customers",
      value: 120,
      icon: <FaUsers />,
      color: "#10B981",
      change: "+8%",
    },
    {
      title: "Revenue",
      value: "₹8.5L",
      icon: <FaWallet />,
      color: "#F59E0B",
      change: "+15%",
    },
    {
      title: "Claims",
      value: 98,
      icon: <FaFileInvoiceDollar />,
      color: "#EF4444",
      change: "+5%",
    },
  ];

  const services = [
    {
      icon: <FaCar />,
      title: "Auto Insurance",
      desc: "Complete vehicle protection with affordable premiums.",
    },
    {
      icon: <FaHome />,
      title: "Home Insurance",
      desc: "Protect your home with comprehensive coverage.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Health Insurance",
      desc: "Affordable healthcare plans for everyone.",
    },
    {
      icon: <FaBuilding />,
      title: "Business Insurance",
      desc: "Protect your business against financial risks.",
    },
    {
      icon: <FaUsers />,
      title: "Dental Insurance",
      desc: "Affordable dental plans for families.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Life Insurance",
      desc: "Secure your family's future today.",
    },
  ];

  const activities = [
    {
      icon: <FaCheckCircle />,
      text: "Policy #PL1024 approved",
    },
    {
      icon: <FaUserPlus />,
      text: "New customer registered",
    },
    {
      icon: <FaClock />,
      text: "3 claims pending approval",
    },
    {
      icon: <FaWallet />,
      text: "₹45,000 premium received",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 42000 },
    { month: "Feb", revenue: 51000 },
    { month: "Mar", revenue: 47000 },
    { month: "Apr", revenue: 68000 },
    { month: "May", revenue: 72000 },
    { month: "Jun", revenue: 81000 },
  ];

  const policyData = [
    { name: "Health", value: 38 },
    { name: "Auto", value: 24 },
    { name: "Life", value: 18 },
    { name: "Home", value: 12 },
    { name: "Business", value: 8 },
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#06B6D4"];

  return (
    <div className={`dashboard-container ${isDarkMode ? "dark" : "light"}`}>
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* HERO */}

      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="hero-content">
          <h1>Insurance Dashboard</h1>

          <p>
            Monitor policies, customers, claims and revenue from one modern
            dashboard.
          </p>

          <div className="hero-buttons">
            <button
              className="add-btn"
              onClick={() => navigate("/category-policy-form")}
            >
              <FaPlus />
              Add Policy
            </button>

            <button className="secondary-btn">
              <FaUserPlus />
              Add Customer
            </button>
          </div>
        </div>
      </motion.section>

      {/* KPI */}

      <section className="stats-grid">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            className="stat-card"
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
          >
            <div
              className="stat-icon"
              style={{
                background: item.color,
              }}
            >
              {item.icon}
            </div>

            <div className="stat-info">
              <span>{item.title}</span>

              <h2>
                {typeof item.value === "number" ? (
                  <CountUp end={item.value} duration={2} />
                ) : (
                  item.value
                )}
              </h2>

              <p>
                <FaArrowUp />
                {item.change} this month
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* QUICK ACTIONS */}

      <section className="quick-actions">
        <h2>Quick Actions</h2>

        <div className="quick-grid">
          <button onClick={() => navigate("/category-policy-form")}>
            <FaPlus />
            New Policy
          </button>

          <button>
            <FaUserPlus />
            New Customer
          </button>

          <button>
            <FaClipboardList />
            View Policies
          </button>

          <button>
            <FaWallet />
            Payments
          </button>
        </div>
      </section>

      <section className="charts-section">
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2>Monthly Revenue</h2>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />

                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366F1"
                fill="url(#colorRevenue)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2>Policy Distribution</h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={policyData} dataKey="value" outerRadius={110} label>
                {policyData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </section>

      {/* RECENT ACTIVITY */}

      <section className="activity-card">
        <h2>Recent Activity</h2>

        {activities.map((item, index) => (
          <div key={index} className="activity-item">
            <div className="activity-icon">{item.icon}</div>
            <span>{item.text}</span>
          </div>
        ))}
      </section>

      {/* SERVICES */}

      <section className="services">
        <h2>Insurance Services</h2>

        <div className="service-grid">
          {services.map((item, index) => (
            <motion.div
              key={index}
              className="service-card"
              whileHover={{
                scale: 1.05,
                rotateY: 6,
              }}
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
