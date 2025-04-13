import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const ViewStores = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", address: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStores = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/admin/stores", {
        params: filters,
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setStores(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching stores");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSearch = () => {
    fetchStores();
  };

  return (
    <div className="view-stores-container">
      <h2>View Stores</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by Name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Search by Email"
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by Address"
          value={filters.address}
          onChange={(e) => setFilters({ ...filters, address: e.target.value })}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isLoading ? (
        <p>Loading stores...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : stores.length > 0 ? (
        <ul>
          {stores.map((store) => (
            <li key={store.id}>
              <h3>{store.name}</h3>
              <p>{store.email}</p>
              <p>{store.address}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No stores found.</p>
      )}
    </div>
  );
};

export default ViewStores;