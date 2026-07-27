import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const { login, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/client");
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:300/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        login(result.user);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/client");
      } else {
        toast.error(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await fetch("http://localhost:300/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: "google-auth",
        }),
      });

      const backendResult = await response.json();

      if (response.ok) {
        toast.success("Login successfully with Google!");
        login(backendResult.user); // Update context
        localStorage.setItem("token", backendResult.token);
        localStorage.setItem("user", JSON.stringify(backendResult.user));
        navigate("/client");
      } else {
        toast.error("Login failed: " + backendResult.message);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Google Login failed. Please try again.");
    }
  };

  return (
    <div className="login">
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="login-container">
        {!isLoggedIn && (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <hr style={{ margin: "20px" }} />
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

            <button type="submit" className="login-btn">
              Sign In
            </button>

            <hr style={{ marginTop: "40px" }} />

            <div className="google-login">
              <button
                type="button"
                className="google-btn"
                onClick={handleGoogleLogin}
              >
                <img
                  src="https://img.icons8.com/color/16/000000/google-logo.png"
                  alt="Google logo"
                />
                Login with Google
              </button>
            </div>
          </form>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
