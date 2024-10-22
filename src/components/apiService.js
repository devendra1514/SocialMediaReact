import axios from 'axios';

const API_URL = 'https://close-guiding-mackerel.ngrok-free.app/';

const handleResponse = (response) => {
  if (response.status === 400) {
    switch(response.data.error) {
      case 'Session expired':
        removeToken();
        alert('Session expired. Please log in again.');
      case 'Account is deleted':
        removeToken();
        alert('Account is deleted. Please sign up.');
      case 'Something went wrong':
        removeToken()
        alert('Something not good happend!');
    }
  }
  return response;
};

const removeToken = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';  
}

const getToken = () => {
  return localStorage.getItem('token');
};

const apiCall = async (endpoint, method = 'GET', data = null) => {
  const token = getToken();
  const options = {
    method,
    url: `${API_URL}${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'token': `${token}`,
      'ngrok-skip-browser-warning': '1',
    },
    data,
  };

  try {
    const response = await axios(options);
    return handleResponse(response);
  } catch (error) {
    if (error.response) {
      return handleResponse(error.response);
    } else {
      throw error;
    }
  }
};

export default apiCall;