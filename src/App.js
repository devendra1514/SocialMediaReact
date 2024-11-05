import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import LoginWithOtp from './components/LoginWithOtp';
import LoginWithPassword from './components/LoginWithPassword';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import SocialNavBar from './components/SocialNavBar';
import Posts from "./components/Posts";
import Comments from "./components/Comments"

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
              <SocialNavBar />
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="/"
          element={
            <PrivateRoute>
              <SocialNavBar />
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="/profile"
          element={
            <PrivateRoute>
              <SocialNavBar />
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="/posts"
          element={
            <PrivateRoute>
              <SocialNavBar />
              <Posts />
            </PrivateRoute>
          }
        />

        <Route path="/comments/:resource_type/:resource_id"
          element={
            <PrivateRoute>
              <SocialNavBar />
              <Comments />
            </PrivateRoute>
          }
        />

        <Route path="*" element={< NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;