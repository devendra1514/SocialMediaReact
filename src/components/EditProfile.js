import React, { useState, useEffect } from 'react';
import apiCall from './apiService';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditProfile({ user, funSetEditMode, funFetchProfileData }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({});
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    const response = await apiCall('/api/v1/users/update', 'PUT', formData, true);

    if (response.status === 200) {
      alert('Profile Details Updated!');
      funSetEditMode(false);
      funFetchProfileData();
    } else if (response.status === 422) {
      setErrorMessages(response.data.error);
    }

    setLoading(false);
  };

  return (
    <div className="modal fade show d-block" style={{ background: 'rgba(0, 0, 0, 0.6)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Edit Profile</h2>
            <button className="btn-close" onClick={() => funSetEditMode(false)}></button>
          </div>
          <div className="modal-body">
            {errorMessages.general && (
              <div className="alert alert-danger">{errorMessages.general}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {errorMessages.username && (
                  <div className="text-danger">{errorMessages.username[0]}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="avatar" className="form-label">Avatar:</label>
                <input
                  type="file"
                  id="avatar"
                  className="form-control"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
              </button>
            </form>
            <button className="btn btn-secondary w-100 mt-3" onClick={() => funSetEditMode(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
