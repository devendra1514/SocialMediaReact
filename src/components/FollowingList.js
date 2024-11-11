// FollowersList.js
import React, { useEffect, useState } from 'react';
import apiCall from './apiService';
import '../css/FollowersList.css';

const FollowingList = ({ onClose, userId }) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFollowing = async () => {
    const response = await apiCall(userId ? `/api/v1/public_profiles/${userId}/followings` : '/api/v1/profile/my_followings', 'GET', {});
    if (response.status === 200) {
      setFollowing(response.data.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFollowing();
  }, []);

  return (
    <div className="followers-overlay">
      <div className="followers-content">
        <div className="modal-header">
          <h4 className="modal-title">Following</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <div>
          {loading ? (
            <p>Loading following list...</p>
          ) : (
            <>
              {following.length > 0 ? (
                <ul className="followers-list">
                  {following.map((follow) => (
                    <li key={follow.id} className='list-item'>
                      {follow.avatar_url ?
                        <img
                          src={follow.avatar_url}
                          alt={follow.name}
                          className="follower-avatar"
                        /> :
                        <i class="icon bi bi-person-circle" />
                      }
                      <span>{follow.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No following found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowingList;
