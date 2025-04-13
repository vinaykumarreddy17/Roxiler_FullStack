import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch admin stats', err);
        setError('Failed to load admin statistics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="loading">Loading admin dashboard...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <span>Total Users:</span> {stats.users}
        </li>
        <li>
          <span>Total Stores:</span> {stats.stores}
        </li>
        <li>
          <span>Total Ratings:</span> {stats.ratings}
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;