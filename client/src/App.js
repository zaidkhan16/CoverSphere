import React, { useContext } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ThemeContext } from "./context/ThemeContext";
import Dashboard from "./components/Dashboard";
import ClientForm from "./components/ClientForm";
import ClientDetails from "./components/ClientDetails";
import CategoryPolicyCard from "./components/CategoryPolicyCard";
import CategoryPolicyForm from "./components/CategoryPolicyForm";
import PolicyForm from "./components/PolicyForm";
import PolicyCard from "./components/policyCard";

function App() {
  const { isDarkMode } = useContext(ThemeContext);

  const navbarStyle = {
    backgroundColor: isDarkMode ? "#11101d" : "#252222",
  };
  return (
    <>
      <Router>
        <div className="App" style={navbarStyle}>
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />

            <Route path="/client" element={<ClientForm />} />
            <Route path="/client-detail" element={<ClientDetails />} />
            <Route
              path="/category-policy-form"
              element={<CategoryPolicyForm />}
            />
            <Route path="/category-policy" element={<CategoryPolicyCard />} />
            <Route path="/policy-form" element={<PolicyForm />} />
            <Route path="/policy" element={<PolicyCard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
