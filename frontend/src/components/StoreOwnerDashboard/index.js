import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const StoreOwnerDashboard = ({ storeId }) => {
  const [storeData, setStoreData] = useState({});
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStoreData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/store/${storeId}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setStoreData(response.data.store);
      setRatings(response.data.ratings);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching store data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, [storeId]);

  if (isLoading) {
    return <p className="loading">Loading store data...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div className="store-owner-dashboard">
      <h3>{storeData.name}</h3>
      <p>Average Rating: {storeData.averageRating || "No ratings yet"}</p>
      <ul>
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <li key={rating.id}>
              <p>
                {rating.user.name} rated: {rating.rating}
              </p>
            </li>
          ))
        ) : (
          <p>No ratings available for this store.</p>
        )}
      </ul>
    </div>
  );
};

export default StoreOwnerDashboard;