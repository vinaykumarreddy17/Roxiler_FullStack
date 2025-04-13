import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  return (
    <div className="home-page-container">
      <h1>Welcome to Roxiler FullStack App</h1>
      <p>Select an option to navigate to your dashboard:</p>
      <div className="dashboard-cards">
        {role === "Admin" && (
          <>
            <div className="card" onClick={() => navigate("/admin-dashboard")}>
              <h3>Admin Dashboard</h3>
              <p>Manage stores, users, and ratings.</p>
            </div>
            <div className="card" onClick={() => navigate("/add-store")}>
              <h3>Add Store</h3>
              <p>Create a new store for users to explore.</p>
            </div>
            <div className="card" onClick={() => navigate("/view-stores")}>
              <h3>View Stores</h3>
              <p>Search and explore all available stores.</p>
            </div>
          </>
        )}

        {role === "StoreOwner" && (
          <>
            <div className="card" onClick={() => navigate("/store-owner-dashboard")}>
              <h3>Store Owner Dashboard</h3>
              <p>View and manage your store details and ratings.</p>
            </div>
          </>
        )}

        {role === "User" && (
          <>
            <div className="card" onClick={() => navigate("/user-dashboard")}>
              <h3>User Dashboard</h3>
              <p>Explore stores and submit ratings.</p>
            </div>
            <div className="card" onClick={() => navigate("/view-stores")}>
              <h3>View Stores</h3>
              <p>Search and explore all available stores.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;