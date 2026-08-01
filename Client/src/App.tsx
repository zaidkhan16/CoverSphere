import type { CSSProperties } from "react";
import { useTheme } from "./context/ThemeContext";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ClientForm from "./components/ClientForm";
import ClientDetails from "./components/ClientDetails";
import CategoryPolicyCard from "./components/CategoryPolicyCard";
import CategoryPolicyForm from "./components/CategoryPolicyForm";
import PolicyForm from "./components/PolicyForm";
import PolicyCard from "./components/policyCard";

function App() {
  const { isDarkMode } = useTheme();

  const appStyle: CSSProperties = {
    backgroundColor: isDarkMode ? "#11101d" : "#252222",
    minHeight: "100vh",
  };

  return (
    <BrowserRouter>
      <div className="App" style={appStyle}>
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
    </BrowserRouter>
  );
}

export default App;
