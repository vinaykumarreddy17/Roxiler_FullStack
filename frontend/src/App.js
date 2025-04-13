import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginForm";
import SignupPage from "./components/SignupForm";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import StoreOwnerDashboard from "./components/StoreOwnerDashboard";
import ViewStores from "./components/ViewStores";
import NotFoundPage from "./components/NotFoundPage";
import RateStore from "./components/RateStore";
import AddStoreForm from "./components/AddStoreForm";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-store" element={<AddStoreForm />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/rate-store/:storeId" element={<RateStore />} />
        <Route path="/view-stores" element={<ViewStores />} />
        <Route path="/store-owner-dashboard" element={<StoreOwnerDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;