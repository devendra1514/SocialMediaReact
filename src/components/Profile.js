import React, { useEffect, useState } from 'react';
import apiCall from './apiService';
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const fetchProfileData = async () => {
    const response = await apiCall('api/v1/users/show', 'GET', {});
    if (response.status === 200) {
      setProfileData(response.data);
    }
  };
  
  const fetchFollowerCount = async () => {
    const response = await apiCall('/api/v1/profile/my_followers', 'GET', {});
    if (response.status === 200) {
      setFollowersCount(response.data.pagination.total_count);
    }
  }

  const fetchFollowingCount = async () => {
    const response = await apiCall('/api/v1/profile/my_followings', 'GET', {});
    if (response.status === 200) {
      setFollowingCount(response.data.pagination.total_count);
    }
  }
  useEffect(() => {
    fetchProfileData();
    fetchFollowerCount();
    fetchFollowingCount();
  }, []);


  return (
    <div className="profile-container">
      {profileData ? (
        <>
          <div className="profile-header">
            <div className="avatar">
              {profileData.thumb_url ? (
                <img src={profileData.thumb_url} alt={`${profileData.name}'s avatar`} />
              ) : (
                <div className="default-avatar">👤</div>
              )}
            </div>
            <div className="profile-info">
              <h1>{profileData.name}</h1>
              <p className="username">{profileData.username}</p>
              <p className="posts-count">{profileData.posts_count} Posts</p>
              <p className="posts-count">{followersCount} Followers</p>
              <p className="posts-count">{followingCount} Following</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
