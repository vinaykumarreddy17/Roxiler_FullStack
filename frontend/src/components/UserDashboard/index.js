import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRatings, setUserRatings] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [storesRes, ratingsRes] = await Promise.all([
          axios.get("/api/stores", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/ratings/mine", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStores(storesRes.data);

        const ratingsMap = {};
        ratingsRes.data.forEach((r) => {
          ratingsMap[r.storeId] = r.rating;
        });
        setUserRatings(ratingsMap);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRatingChange = async (storeId, newRating) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/ratings`,
        { storeId, rating: newRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserRatings({ ...userRatings, [storeId]: newRating });
      alert("Rating updated successfully!");
    } catch (err) {
      console.error("Failed to update rating", err);
      alert("Failed to update rating. Please try again.");
    }
  };

  if (loading) return <p className="loading">Loading stores...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="user-dashboard-container">
      <h2>User Dashboard</h2>
      {stores.length === 0 ? (
        <p>No stores available.</p>
      ) : (
        <ul>
          {stores.map((store) => (
            <li key={store.id}>
              <strong>{store.name}</strong> - {store.address} <br />
              Average Rating: {store.avgRating || "Not rated yet"} <br />
              Your Rating:{" "}
              <select
                value={userRatings[store.id] || ""}
                onChange={(e) =>
                  handleRatingChange(store.id, parseInt(e.target.value, 10))
                }
              >
                <option value="">Rate</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;