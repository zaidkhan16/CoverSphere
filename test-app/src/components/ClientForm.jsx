import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientInfoForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:300/client/clientInfo-create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw toast.error("Failed to submit client data.");
      }

      toast.success("Client information submitted successfully!");
      setTimeout(() => {
        navigate("/client-detail");
      }, 5000);
    } catch (error) {
      toast.error("Error submitting the form. Please try again.");
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <fieldset>
            <legend>Step 1: Personal Information</legend>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </fieldset>
        );
      case 2:
        return (
          <fieldset>
            <legend>Step 2: Contact Information</legend>
            <label>
              Phone Number:
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email Address:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Street Address:
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Zip Code:
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </label>
          </fieldset>
        );

      default:
        return null;
    }
  };

  const progress = (currentStep / 2) * 100;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        top: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="multi-step-form">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="Toastify"
        />
        <h2>Client Information Form</h2>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <form onSubmit={handleSubmit} style={{ width: "400px" }}>
          {renderStepContent()}
          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep}>
                Previous
              </button>
            )}
            {currentStep < 2 && (
              <button type="button" onClick={nextStep}>
                Next
              </button>
            )}
            {currentStep === 2 && <button type="submit">Submit</button>}
          </div>
        </form>
      </div>
    </div>
  );
}
