import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiCall from './apiService';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({});
    setLoading(true)

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('full_phone_number', phone);
    formData.append('password', password);
    formData.append('password_confirmation', confirmPassword);
    if (avatar) {
      formData.append('avatar', avatar);
    }
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    const response = await apiCall('api/v1/users', 'POST', formData, true);

    if (response.status === 200) {
      alert('User created successfully! Please login.');
      navigate('/login_with_password');
    } else if (response.status === 422) {
      setErrorMessages(response.data.error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Create an Account</h2>
            {errorMessages.general && (
              <div className="alert alert-danger">{errorMessages.general}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {errorMessages.username && (
                  <p className="text-danger">{errorMessages.username[0]}</p>
                )}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                {errorMessages.full_phone_number && (
                  <p className="text-danger">{errorMessages.full_phone_number[0]}</p>
                )}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {errorMessages.password_confirmation && (
                  <p className="text-danger">{errorMessages.password_confirmation[0]}</p>
                )}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="avatar">Avatar:</label>
                <input
                  type="file"
                  id="avatar"
                  className="form-control"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
            <div className="mt-4 d-flex justify-content-between">
              <button className="btn btn-link" onClick={() => navigate(`/login_with_password`)}>
                Login with Password
              </button>
              <button className="btn btn-link" onClick={() => navigate(`/login_with_otp`)}>
                Login with OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
