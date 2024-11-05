import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiCall from './apiService';

const UserCard = ({ user }) => {
  const [isFollowed, setIsFollowed] = useState(user.followed);

  const handleFollow = async (e) => {
    e.preventDefault();

    const followData = {
        followed_id: user.user_id
    };

    try {
      const response = await apiCall('api/v1/follow', 'POST', followData);

      const updatedFollowedStatus = response.data.message === 'Follow';
      setIsFollowed(updatedFollowedStatus);
    } catch (error) {
      console.error("Error while liking the post:", error);
    }
  };

  const handleProfileClick = () => {
    // navigate(`/comments/Post/${post.post_id}`);
  };

  return (
    <div className="card mb-4 shadow-sm border-1">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          { 
            user.thumn_url ? <img
                src={user.avatar_url}
                alt={user.name}
                className="rounded-circle me-3"
                style={{ width: '50px', height: '50px' }}
            /> : null 
          }
          <div>
            <h6 className="mb-0">{user.name}</h6>
            <small className="text-muted">@{user.username}</small>
          </div>
        </div>

        <div className="d-flex justify-content-start mt-3">
          <div className="d-flex align-items-center me-4">
            {isFollowed ? (
              <button onClick={handleFollow} style={{ fontSize: '0.8rem', color: 'red', cursor: 'pointer' }}>Unfollow</button>
            ) : (
              <button onClick={handleFollow} style={{ fontSize: '0.8rem', cursor: 'pointer' }}>Follow</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
