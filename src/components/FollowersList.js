  // FollowersList.js
  import React, { useEffect, useState } from 'react';
  import apiCall from './apiService';
  import '../css/FollowersList.css';

  const FollowersList = ({ onClose }) => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchFollowers = async () => {
      const response = await apiCall('/api/v1/profile/my_followers', 'GET', {});
      if (response.status === 200) {
        setFollowers(response.data.users);
      }
      setLoading(false);
    };

    useEffect(() => {
      fetchFollowers();
    }, []);

    return (
      <div className="followers-overlay">
        <div className="followers-content">
          <div className="modal-header">
            <h4 className="modal-title">Followers</h4>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div>
            {loading ? (
              <p>Loading followers...</p>
            ) : (
              <>
                {followers.length > 0 ? (
                  <ul className="followers-list">
                    {followers.map((follower) => (
                      <li key={follower.id} className='list-item'>
                        {follower.avatar_url ?
                        <img
                          src={follower.avatar_url}
                          alt={follower.name}
                          className="follower-avatar"
                        /> :
                        <i class="icon bi bi-person-circle" />
                        }
                        <span>{follower.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No followers found.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default FollowersList;
