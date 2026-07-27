import React, { useContext, useState } from "react";
import "./Signup.css";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../context/ThemeContext";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:300/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Signup successful!");
        setTimeout(() => {
          navigate("/signin");
        }, 5000);
      } else {
        if (result.message === "User already exists") {
          toast.error("User already exists. Please use a different email.");
        } else {
          toast.error(result.message || "Signup failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await fetch("http://localhost:300/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          phone: "N/A",
          password: "",
        }),
      });

      const backendResult = await response.json();

      if (response.ok) {
        toast.success("Signup successful with Google!");
        setTimeout(() => {
          navigate("/signin");
        }, 5000);
      } else {
        if (backendResult.message === "User already exists") {
          toast.error(
            "User already exists with this email. Please try logging in."
          );
        } else {
          toast.error(backendResult.message || "Google Signup failed.");
        }
      }
    } catch (error) {
      console.error("Error during Google signup:", error);
      toast.error("Google Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup">
      <ToastContainer autoClose={5000} />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <hr style={{ margin: "20px" }} />
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your 10-digit phone number"
              value={formData.phone}
              onChange={handleInputChange}
              pattern="^\d{10}$"
              required
              title="Phone number must be exactly 10 digits."
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          <hr style={{ marginTop: "40px" }} />

          <div className="google-signup">
            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleSignup}
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google logo"
              />
              Sign Up with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
