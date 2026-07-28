import React, { useEffect, useState } from "react";
import "./ClientDetails.css";
import { useNavigate } from "react-router-dom";

export default function ClientDetails() {
  const [clients, setClients] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchClientData();
  }, []);

  const fetchClientData = async () => {
    try {
      const response = await fetch("http://localhost:300/client");
      if (!response.ok) throw new Error("Failed to fetch client data.");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const toggleRow = (clientId) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [clientId]: !prevState[clientId],
    }));
  };

  const handleDelete = async (clientId) => {
    try {
      const response = await fetch(`http://localhost:300/client/${clientId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete client.");
      setClients(clients.filter((client) => client._id !== clientId));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditClick = (client) => {
    setCurrentClient(client);
    setEditPopupOpen(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:300/client/${currentClient._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentClient),
        }
      );

      if (!response.ok) throw new Error("Failed to update client.");

      const updatedClient = await response.json();

      setClients((prevClients) =>
        prevClients.map((client) =>
          client._id === updatedClient.updatedClient._id
            ? updatedClient.updatedClient
            : client
        )
      );

      setEditPopupOpen(false);
      setCurrentClient(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClients = clients.filter(
    (client) =>
      `${client.firstName} ${client.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="table">
        <div className="client-info-table">
          <div className="add-information-container">
            <div className="search">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="add-client">
              <button onClick={() => navigate("/client")}>
                Add Information
              </button>
            </div>
          </div>

          <h2>Client Information</h2>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <React.Fragment key={client._id}>
                    <tr>
                      <td>
                        {client.firstName} {client.lastName}
                      </td>
                      <td>{formatDate(client.dob)}</td>
                      <td>{client.gender}</td>
                      <td>{client.phone}</td>
                      <td>{client.email}</td>
                      <td>
                        <button onClick={() => toggleRow(client._id)}>
                          {expandedRows[client._id] ? "Show Less" : "Show More"}
                        </button>
                      </td>
                    </tr>
                    {expandedRows[client._id] && (
                      <tr>
                        <td colSpan="6">
                          <div className="expanded-content">
                            <p>
                              <strong>Address:</strong> {client.streetAddress},{" "}
                              {client.city}, {client.state} {client.zipCode}
                            </p>
                            <div className="action-buttons">
                              <button onClick={() => handleEditClick(client)}>
                                Edit
                              </button>
                              <button onClick={() => handleDelete(client._id)}>
                                Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No client data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editPopupOpen && currentClient && (
        <div className="edit-popup">
          <form onSubmit={handleUpdate}>
            <h3>Edit Client Detail</h3>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={currentClient.firstName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={currentClient.lastName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={currentClient.phone}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={currentClient.email}
                onChange={handleInputChange}
              />
            </label>
            <div className="adress_input">
              <label>
                Street Address:
                <input
                  type="text"
                  name="streetAddress"
                  value={currentClient.streetAddress}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={currentClient.city}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="adress_input">
              <label>
                State:
                <input
                  type="text"
                  name="state"
                  value={currentClient.state}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                ZIP Code:
                <input
                  type="text"
                  name="zipCode"
                  value={currentClient.zipCode}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="popup-actions">
              <button type="submit">Update</button>
              <button onClick={() => setEditPopupOpen(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
