// Profile.js
import React, { useEffect, useState } from 'react';
import apiCall from './apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Profile.css';
import EditProfile from './EditProfile';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [followersListMode, setFollowersListMode] = useState(false);
  const [followingListMode, setFollowingListMode] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const fetchProfileData = async () => {
    setLoading(true);
    const response = await apiCall('api/v1/users/show', 'GET', {});
    if (response.status === 200) {
      setProfileData(response.data);
    }
    setLoading(false);
  };

  const fetchUserPosts = async () => {
    setLoading(true);
    const response = await apiCall('/api/v1/profile/my_posts', 'GET', {});
    if (response.status === 200) {
      setUserPosts(response.data.posts);
    }
    setLoading(false);
  };

  const handleClick = (type) => {
    type == 'follower' ? setFollowersListMode(true) : setFollowingListMode(true)
  };

  useEffect(() => {
    fetchProfileData();
    fetchUserPosts();
  }, []);

  return (
    <div className="container w-75 my-5 p-4 bg-light rounded shadow-sm">
      {loading ? (
        <p>Loading...</p>
      ) : profileData ? (
        <>
          <div className="row align-items-center mb-4">
            <div className="col-md-3 d-flex justify-content-center">
              <div className="rounded-circle border border-info p-1 bg-white d-flex justify-content-center align-items-center" style={{ width: '150px', height: '150px' }}>
                {profileData.thumb_url ? (
                  <img src={profileData.thumb_url} alt={`${profileData.name}'s avatar`} className="profile-pic rounded-circle" />
                ) : (
                  <div style={{ fontSize: '50px' }}>👤</div>
                )}
              </div>
            </div>
            <div className="col-md-9">
              <h1 className='mb-0'>{profileData.name}</h1>
              <p className="text-primary fw-bold mb-1">@{profileData.username}</p>
              <div className="stats-counts">
                <span className="fw-bold ms-0 m-2">{profileData.posts_count} Posts</span>
                <span className="fw-bold m-2" onClick={() => handleClick('follower')} style={{ cursor: 'pointer' }}>
                  {profileData.followers_count} Followers
                </span>
                <span className="fw-bold m-2" onClick={() => handleClick('following')} style={{ cursor: 'pointer' }}>
                  {profileData.followings_count} Following
                  </span>
              </div>
              <button className="btn btn-primary mt-2 mb-2" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            </div>
          </div>

          <div className="row g-2">
            {userPosts.map((post) => (
              <div key={post.post_id} className="col-4">
                <div className="post-item-square">
                  {
                    post.media_url ? (
                      <div className="post-image-container">
                        <img
                          src={post.thumb_url}
                          alt={post.title}
                          className="img-fluid post-image-square"
                        />
                        {
                          post.content_type.includes('video')
                          ?
                            <div className="video-icon">
                              <i className="bi bi-play-circle-fill"></i>
                            </div>
                          :
                            null
                        }
                      </div>
                    ) : <div style={{textAlign: "center"}}>{post.title}</div>
                  }
                  <div className="overlay" onClick={ () => navigate(`/comments/Post/${post.post_id}`) }>
                    <span><i className="bi bi-heart"></i> {post.likes_count}</span>
                    <span><i className="bi bi-chat"></i> {post.comments_count}</span>
                    {/* { post.content_type.inclueds('video') ? <span><i className="bi bi-chat"></i> {post.comments_count} : null } */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No profile data available.</p>
      )}

      {editMode && (
        <EditProfile user={profileData} funSetEditMode={setEditMode} funFetchProfileData={fetchProfileData} />
      )}

      {followersListMode && (
        <FollowersList onClose={() => setFollowersListMode(false)} />
      )}

      {followingListMode && (
        <FollowingList onClose={() => setFollowingListMode(false)} />
      )}
    </div>
  );
};

export default Profile;
