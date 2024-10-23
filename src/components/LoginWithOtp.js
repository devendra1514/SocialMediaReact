import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiCall from './apiService';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginWithOtp() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOtpSend = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const response = await apiCall('api/v1/otp', 'POST', {
      full_phone_number: phone,
      purpose: 'login',
    });

    if (response.status === 200) {
      setOtpSent(true);
    } else {
      setErrorMessage(response.data.error);
    }
    setLoading(false);
  };

  const handleOtpLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const loginData = {
      full_phone_number: phone,
      code: otp,
    };

    const response = await apiCall('api/v1/session/login_with_otp', 'POST', loginData);

    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem('token', token);
      alert('Login successful! Redirecting to dashboard.');
      navigate('/');
    } else {
      setErrorMessage(response.data.error);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">OTP Login</h2>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <form>
              <div className="form-group mb-3">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={otpSent}
                />
              </div>
              {otpSent && (
                <div className="form-group mb-3">
                  <label htmlFor="otp">Enter OTP:</label>
                  <input
                    type="text"
                    id="otp"
                    className="form-control"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="text-center">
                {loading ? (
                  <button className="btn btn-primary w-100" disabled>
                    {otpSent ? 'Logging in...' : 'Sending OTP...'}
                  </button>
                ) : otpSent ? (
                  <button className="btn btn-success w-100" onClick={handleOtpLogin}>
                    Login
                  </button>
                ) : (
                  <button className="btn btn-primary w-100" onClick={handleOtpSend}>
                    Send OTP
                  </button>
                )}
              </div>
            </form>

            <div className="mt-4 d-flex justify-content-between">
              <button className="btn btn-link" onClick={() => navigate(`/signup`)}>
                Create new account
              </button>
              <button className="btn btn-link" onClick={() => navigate(`/login_with_password`)}>
                Login with Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginWithOtp;
