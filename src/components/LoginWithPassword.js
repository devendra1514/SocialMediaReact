import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiCall from './apiService';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const loginData = {
      full_phone_number: phone,
      password: password,
    };

    console.log("Logging in with data:", loginData);

    const response = await apiCall('api/v1/session/login_with_password', 'POST', loginData)

    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem('token', token);
      alert('Login successful! Redirecting to dashboard.');
      navigate('/');
    } else if (response.status === 400) {
      setErrorMessage(response.data.error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Login</h2>

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
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

              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>

            <div className="mt-4 d-flex justify-content-between">
              <button className="btn btn-link" onClick={() => navigate(`/signup`)}>
                Create new account
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

export default Login;
