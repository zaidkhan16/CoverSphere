import React, { useEffect, useState } from "react";
import "./CategoryPolicyCard.css";
import { useNavigate } from "react-router-dom";

export default function CategoryPolicyCard() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPolicy, setEditPolicy] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("http://localhost:300/category-policy");
        if (!response.ok) {
          throw new Error("Failed to fetch policies");
        }
        const data = await response.json();
        setPolicies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:300/category-policy/${id}`, {
        method: "DELETE",
      });
      setPolicies((prev) => prev.filter((policy) => policy._id !== id));
    } catch (err) {
      setError("Failed to delete policy");
    }
  };

  const handleEdit = (policy) => {
    setEditPolicy(policy);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:300/category-policy/${editPolicy._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editPolicy),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update policy");
      }

      const fetchPolicies = async () => {
        const policiesResponse = await fetch(
          "http://localhost:300/category-policy"
        );
        const policiesData = await policiesResponse.json();
        setPolicies(policiesData);
      };

      await fetchPolicies();

      setIsEditing(false);
    } catch (err) {
      setError("Failed to update policy");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditPolicy({ ...editPolicy, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClients = policies.filter((policy) =>
    policy.policyType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="policy-container">
        <div className="add-insurance-container">
          <div className="insurance-search">
            <input
              type="text"
              placeholder="Search by Policy Type..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="insurance-add-client">
            <button onClick={() => navigate("/category-policy-form")}>
              Add Policy
            </button>
          </div>
        </div>

        {loading && <p>Loading policies...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Policies */}
        <div className="policy-cards">
          {filteredClients.map((policy) => (
            <div className="policy-card" key={policy._id}>
              <h2>{policy.policyType.toUpperCase()} INSURANCE</h2>
              <hr style={{ marginBottom: "14px" }} />
              <p style={{ width: "268px" }} className="policycard-desc">
                <strong>Description:</strong> {policy.policyDescription}
              </p>
              <p>
                <strong>Amount:</strong> ₹{policy.policyAmount}
              </p>
              <p>
                <strong>Coverage:</strong> {policy.coverageDuration} years
              </p>

              <hr style={{ margin: "14px" }} />

              <div className="category-buttons">
                <button onClick={() => handleDelete(policy._id)}>Delete</button>
                <button onClick={() => handleEdit(policy)}>Edit</button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Policy Popup */}
        {isEditing && (
          <div className="edit-popup">
            <div className="popup-content">
              <h3>Edit Policy</h3>
              <label>
                Policy Type:
                <input
                  type="text"
                  name="policyType"
                  value={editPolicy.policyType}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="policyDescription"
                  value={editPolicy.policyDescription}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Amount:
                <input
                  type="number"
                  name="policyAmount"
                  value={editPolicy.policyAmount}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Coverage Duration:
                <input
                  type="number"
                  name="coverageDuration"
                  value={editPolicy.coverageDuration}
                  onChange={handleInputChange}
                />
              </label>
              <div className="popup-buttons">
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
