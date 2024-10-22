import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import LoginWithOtp from './components/LoginWithOtp';
import LoginWithPassword from './components/LoginWithPassword';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login_with_otp" 
          element={
            <PublicRoute>
              <LoginWithOtp />
            </PublicRoute>
          } 
        />

        <Route path="/login_with_password" 
          element={
            <PublicRoute>
              <LoginWithPassword />
            </PublicRoute>
          } 
        />

        <Route path="/signup" 
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } 
        />

        <Route path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="*" element={< NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;