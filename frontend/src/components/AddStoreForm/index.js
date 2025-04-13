import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const AddStoreForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (name.length < 20 || name.length > 60) {
      alert("Name must be between 20 and 60 characters.");
      return false;
    }
    if (address.length > 400) {
      alert("Address must not exceed 400 characters.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const storeData = { name, email, address };
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/admin/add-store", storeData, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      alert("Store added successfully");
      setName("");
      setEmail("");
      setAddress("");
    } catch (error) {
      alert(error.response?.data?.message || "Error adding store");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Store</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Store Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Store Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Store Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Store"}
        </button>
      </form>
    </div>
  );
};

export default AddStoreForm;