import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import apiCall from './apiService';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login_with_password');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      
    </div>
  );
};

export default Dashboard;
