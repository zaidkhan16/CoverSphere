import React, { useEffect, useState } from "react";
import "./PolicyCard.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PolicyCard = () => {
  const [policies, setPolicies] = useState([]); // Store all policies
  const [loading, setLoading] = useState(true); // Loading state
  const [editPolicy, setEditPolicy] = useState(null); // Policy to edit
  const [showPopup, setShowPopup] = useState(false); // Show/hide popup
  const [formData, setFormData] = useState({}); // Form data for editing
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  const navigate = useNavigate();

  // Fetch all policies
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("http://localhost:300/policy");
        if (!response.ok) {
          throw new Error("Failed to fetch policies");
        }
        const data = await response.json();
        setPolicies(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching policies:", err);
        toast.error("Error fetching policies. Please try again later.");
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  // Delete policy
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:300/policy/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete policy");
      }
      toast.success("Policy deleted successfully!");
      setPolicies(policies.filter((policy) => policy._id !== id));
    } catch (err) {
      console.error("Error deleting policy:", err);
      toast.error("Error deleting policy. Please try again.");
    }
  };

  // Open edit popup
  const handleEdit = (policy) => {
    setEditPolicy(policy);
    setFormData(policy);
    setShowPopup(true);
  };

  // Update form data as user edits fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit updated policy
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:300/policy/${editPolicy._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update policy");
      }

      toast.success("Policy updated successfully!");

      // Reload the page to reflect changes
      window.location.reload();
    } catch (err) {
      console.error("Error updating policy:", err);
      toast.error("Error updating policy. Please try again.");
    }
  };

  // Search change handler
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (policies.length === 0) {
    return <div>No policies found.</div>;
  }

  // Filter policies based on search term
  const filteredPolicies = policies.filter((policy) =>
    policy.categoryOfPolicy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="policy_card">
      <div className="add-policy-container">
        <div className="policy-search">
          <input
            type="text"
            placeholder="Search by Policy Type..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="policy-add-client">
          <button onClick={() => navigate("/policy-form")}>
            Add Policy Information
          </button>
        </div>
      </div>
      <div className="policy-list">
        {/* <h3>All Policies</h3> */}
        <div className="policy-card-1">
          {filteredPolicies.map((policy) => (
            <div key={policy._id}>
              <div className="policy-subcard h-100">
                <img
                  src={policy.policyImage || "https://via.placeholder.com/300"}
                  className="policy-subcard-img-top"
                  alt="Policy"
                  style={{ height: "300px" }}
                />
                <div className="card_body">
                  <h5 className="card-title text-center">
                    {policy.nameOfClient && policy.nameOfClient.firstName
                      ? `${policy.nameOfClient.firstName} ${policy.nameOfClient.lastName}`
                      : "Unknown Client"}
                  </h5>

                  <p className="card_text">
                    <strong>Category:</strong> {policy.categoryOfPolicy}
                  </p>
                  <p className="card_text">
                    <strong>Start Date:</strong>{" "}
                    {new Date(policy.startDate).toLocaleDateString()}
                  </p>
                  <p className="card_text">
                    <strong>Expiry Date:</strong>{" "}
                    {new Date(policy.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="card_footer">
                  <button
                    className="btn_danger"
                    onClick={() => handleDelete(policy._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="policy-edit-btn-hover"
                    style={{ backgroundColor: "#11101d" }}
                    onClick={() => handleEdit(policy)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Popup */}
      {showPopup && (
        <div className="policycard-popup">
          <div className="policycard-popup-content">
            <h4>Edit Policy</h4>
            <form>
              <div className="policycard-form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="categoryOfPolicy"
                  value={formData.categoryOfPolicy || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="policycard-form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="policycard-form-group">
                <label>Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="policycard-form-group">
                <label>Policy Image</label>
                <input
                  type="text"
                  name="policyImage"
                  value={formData.policyImage || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </form>
            <div className="policycard-popup-footer">
              <button className="btn btn-success" onClick={handleUpdate}>
                Update
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyCard;
