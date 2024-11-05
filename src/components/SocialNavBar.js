import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useContext } from 'react';
import UserContext from './UserContext';

const SocialNavBar = () => {
  const navigate = useNavigate();
  const current_user = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login_with_password');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
      <div className="container-fluid">
      <Link className="navbar-brand fw-bold d-flex justify-content-center align-items-center" to="/">
        <i className="bi bi-tencent-qq" style={{ fontSize: '2rem' }}></i>
      </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/posts">
                Posts
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item me-3">
              <Link className="nav-link" to="/profile">
              { current_user ? <img src={current_user.thumb_url} alt={`${current_user.name}'s avatar`} style={{borderRadius: '100px', width: '40px' }}/> : <FaUserCircle size={28} className="text-black" /> }
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-danger nav-link px-3 py-1 rounded-pill"
                onClick={handleLogout}
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
