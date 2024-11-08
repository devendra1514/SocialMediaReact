import React, { useEffect, useState } from 'react';
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
import PostNew from './components/PostNew';
import ChildComments from './components/ChildComments';
import Users from './components/Users';
import About from './components/About';
import UserContext from './components/UserContext'
import apiCall from './components/apiService';
import Moments from './components/Moments'
import MomentNew from './components/MomentNew';


function App() {
  const [current_user, setCurrentUser] = useState(null);
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await apiCall('api/v1/users/show');
      if (response.status === 200) {
        setCurrentUser(response.data);
      }
    }
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={current_user}>
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

          <Route path="/comments/Post/:resource_id"
            element={
              <PrivateRoute>
                <SocialNavBar />
                <Comments />
              </PrivateRoute>
            }
            />

          <Route path="/child_comments/Comment/:resource_id"
            element={
              <PrivateRoute>
                <SocialNavBar />
                <ChildComments />
              </PrivateRoute>
            }
          />

          <Route path="/posts/new"
            element={
              <PrivateRoute>
                <SocialNavBar />
                <PostNew />
              </PrivateRoute>
            }
          />

          <Route path="/users"
            element={
              <PrivateRoute>
                <SocialNavBar />
                <Users />
              </PrivateRoute>
            }
          />

          <Route path="/about"
            element={
              <PrivateRoute>
                <SocialNavBar />
                <About />
              </PrivateRoute>
            }
          />

          <Route path="/moments"
            element={
              <PrivateRoute>
                <SocialNavBar />
                <Moments />
              </PrivateRoute>
            }
          />

          <Route path='/moments/new'
            element={
              <PrivateRoute>
                <SocialNavBar/>
                <MomentNew/>
              </PrivateRoute>
            }
          />

          <Route path="*" element={< NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;