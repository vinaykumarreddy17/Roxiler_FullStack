import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={goToHome} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;