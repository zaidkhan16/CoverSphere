import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientInfoForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CategoryPolicyForm() {
  const [formData, setFormData] = useState({
    policyType: "",
    policyDescription: "",
    policyAmount: "",
    coverageDuration: "",
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

    if (
      !formData.policyType ||
      !formData.policyDescription ||
      formData.policyAmount <= 0 ||
      formData.coverageDuration <= 0
    ) {
      toast.error("Please provide valid inputs for all fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:300/category-policy/create",
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
        navigate("/category-policy");
      }, 4000);
    } catch (error) {
      toast.error("Error submitting the form. Please try again.");
    }
  };

  // Calculate progress bar width

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
        <h2>Policy Information Form</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Policy Category</legend>
            <label>
              Policy Type:
              <select
                name="policyType"
                value={formData.policyType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Policy Type</option>
                <option value="health">Health Insurance</option>
                <option value="life">Life Insurance</option>
                <option value="vehicle">Vehicle Insurance</option>
                <option value="home">Home Insurance</option>
                <option value="travel">Travel Insurance</option>
              </select>
            </label>
            <label htmlFor="policyDescription">
              Policy Description :
              <textarea
                name="policyDescription"
                value={formData.policyDescription}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Policy Amount:
              <input
                type="number"
                name="policyAmount"
                value={formData.policyAmount}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Coverage Duration (Years):
              <input
                type="number"
                name="coverageDuration"
                value={formData.coverageDuration}
                onChange={handleInputChange}
                required
              />
            </label>
          </fieldset>
          <div className="navigation-buttons">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
