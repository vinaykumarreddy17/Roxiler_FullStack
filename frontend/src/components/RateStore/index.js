import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const RateStore = ({ storeId }) => {
  const [rating, setRating] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateRating = () => {
    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5.");
      return false;
    }
    return true;
  };

  const handleRatingSubmit = async () => {
    if (!validateRating()) return;

    setIsSubmitting(true);
    try {
      await axios.post(
        `http://localhost:5000/api/rating/rate/${storeId}`,
        { rating: parseInt(rating, 10) },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      alert("Rating submitted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Error submitting rating");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rate-store-container">
      <h4>Rate this Store</h4>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        disabled={isSubmitting}
      />
      <button onClick={handleRatingSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Rating"}
      </button>
    </div>
  );
};

export default RateStore;