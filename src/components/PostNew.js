import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiCall from './apiService';
import 'bootstrap/dist/css/bootstrap.min.css';

function PostNew() {
  const [title, setTitle] = useState('');
  const [media, setMedia] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({});
    setLoading(true)

    const formData = new FormData();
    formData.append('title', title);
    if (media) {
      formData.append('media', media);
    }
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    const response = await apiCall('api/v1/posts', 'POST', formData, true);

    if (response.status === 200) {
      alert('Post uploaded successfully!');
      navigate('/posts');
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
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="tile"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                {errorMessages.title && (
                  <p className="text-danger">{errorMessages.title[0]}</p>
                )}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="media">Media:</label>
                <input
                  type="file"
                  id="media"
                  className="form-control"
                  onChange={(e) => setMedia(e.target.files[0])}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">{loading ? 'Uploading...' : 'Upload'}</button>
            </form>
            <div className="mt-4 d-flex justify-content-between">
              <button className="btn btn-link" onClick={() => navigate(`/posts`)}>
                Posts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostNew;
