import React, { useEffect, useState } from "react";
import "./PolicyForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PolicyForm = () => {
  const [formData, setFormData] = useState({
    nameOfClient: "",
    categoryOfPolicy: "",
    startDate: "",
    expiryDate: "",
    policyImage: "",
  });

  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:300/client");

        if (!response.ok) {
          throw toast.error("Failed to fetch data.");
        }

        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching client data. Please try again.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nameOfClient ||
      !formData.categoryOfPolicy ||
      !formData.startDate ||
      !formData.expiryDate ||
      !formData.policyImage
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:300/policy/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        toast.success("Policy created successfully...!✨");
        setFormData({
          nameOfClient: "",
          categoryOfPolicy: "",
          startDate: "",
          expiryDate: "",
          policyImage: "",
        });
        setTimeout(() => {
          navigate("/policy");
        }, 4000);
      }
    } catch (error) {
      console.error("Error creating policy:", error);
      toast.error("Error creating policy. Please try again.");
    }
  };

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
      <div className="policy-form-container" style={{ width: "900px" }}>
        <h2>Create a New Policy</h2>
        <form onSubmit={handleSubmit} className="policy-form">
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

          <div className="policy-form-group">
            <label htmlFor="nameOfClient">Client Name:</label>
            <select
              id="nameOfClient"
              name="nameOfClient"
              value={formData.nameOfClient}
              onChange={handleChange}
              className="policy-form-input"
            >
              <option value="">Select a Client</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.firstName} {client.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="policy-form-group">
            <label htmlFor="categoryOfPolicy">Category of Policy:</label>
            <select
              id="categoryOfPolicy"
              name="categoryOfPolicy"
              value={formData.categoryOfPolicy}
              onChange={handleChange}
              className="policy-form-input"
            >
              <option value="">Select a Category</option>
              <option value="health">Health Insurance</option>
              <option value="life">Life Insurance</option>
              <option value="vehicle">Vehicle Insurance</option>
              <option value="home">Home Insurance</option>
              <option value="travel">Travel Insurance</option>
            </select>
          </div>

          <div className="policy-form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="policy-form-input"
            />
          </div>

          <div className="policy-form-group">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="policy-form-input"
            />
          </div>

          <div className="policy-form-group">
            <label htmlFor="policyImage">Policy Image (URL):</label>
            <input
              type="text"
              id="policyImage"
              name="policyImage"
              value={formData.policyImage}
              onChange={handleChange}
              className="policy-form-input"
            />
          </div>

          <button type="submit" className="policy-submit-button">
            Create Policy
          </button>
        </form>
      </div>
    </div>
  );
};

export default PolicyForm;
