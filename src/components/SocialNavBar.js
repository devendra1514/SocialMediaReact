import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from 'react-icons/fa';
import "bootstrap-icons/font/bootstrap-icons.css";
import UserContext from './UserContext';
import '../css/NavBar.css';

const SocialNavBar = () => {
  const navigate = useNavigate();
  const current_user = useContext(UserContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login_with_password');
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const closeNav = () => setIsNavCollapsed(true); // Function to close the nav

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold d-flex justify-content-center align-items-center" to="/">
          <i className="bi bi-tencent-qq" style={{ fontSize: '2rem' }}></i>
        </Link>

        {/* Toggler button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/posts" onClick={closeNav}>
                Posts
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/users" onClick={closeNav}>
                Users
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/moments" onClick={closeNav}>
                Moments
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeNav}>
                About
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item me-3">
              <Link className="nav-link" to="/profile" onClick={closeNav}>
                {current_user ? (
                  <img
                    src={current_user.thumb_url}
                    alt={`${current_user.name}'s avatar`}
                    style={{ borderRadius: '100px', width: '40px' }}
                  />
                ) : (
                  <FaUserCircle size={28} className="text-black" />
                )}
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-danger nav-link px-3 py-1 rounded-pill"
                onClick={() => {
                  handleLogout();
                  closeNav();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SocialNavBar;
