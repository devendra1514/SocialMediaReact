import axios from 'axios';

const API_URL = 'https://vocal-moose-master.ngrok-free.app/';

const handleResponse = (response) => {
  if (response.status === 400) {
    switch (response.data.error) {
      case 'Session expired':
        removeToken();
        alert('Session expired. Please log in again.');
        break;
      case 'Account is deleted':
        removeToken();
        alert('Account is deleted. Please sign up.');
        break;
      case 'Something went wrong':
        removeToken();
        alert('Something not good happened!');
        break;
    }
  }
  return response;
};

const removeToken = () => {
  localStorage.removeItem('token');
  window.location.href = '/login_with_password';
};

const getToken = () => {
  return localStorage.getItem('token');
};

const apiCall = async (endpoint, method = 'GET', data = null, multipart = false) => {
  const token = getToken();
  const options = {
    method,
    url: `${API_URL}${endpoint}`,
    headers: {
      'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': '1',
    },
    data,
  };

  if (token) {
    options.headers['token'] = token;
  }

  try {
    const response = await axios(options);
    return handleResponse(response);
  } catch (error) {
    if (error.response) {
      return handleResponse(error.response);
    } else {
      alert('Problem with Backend: ', error.message);
      throw error;
    }
  }
};

export default apiCall;
