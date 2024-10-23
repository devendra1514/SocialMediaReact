import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiCall from './apiService';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const navigate = useNavigate();

  const handleLike = async (e) => {
    e.preventDefault();

    const likeData = {
      resource_type: 'Post',
      resource_id: post.post_id,
    };

    try {
      const response = await apiCall('api/v1/likes', 'POST', likeData);

      const updatedLikedStatus = response.data.message === 'Liked';
      setIsLiked(updatedLikedStatus);
      setLikesCount((prevCount) => (updatedLikedStatus ? prevCount + 1 : prevCount - 1));
    } catch (error) {
      console.error("Error while liking the post:", error);
    }
  };

  const handleCommentsClick = () => {
    navigate(`/comments/Post/${post.post_id}`);
  };

  return (
    <div className="card mb-4 shadow-sm border-1">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={post.author.avatar_url}
            alt={post.name}
            className="rounded-circle me-3"
            style={{ width: '50px', height: '50px' }}
          />
          <div>
            <h6 className="mb-0">{post.author.name}</h6>
            <small className="text-muted">@{post.author.username}</small>
          </div>

          <span className="ms-auto text-muted">{post.created_at}</span>
        </div>

        <h6 className="card-title">{post.title}</h6>

        <div className="text-center my-3">
          { post.thumb_url ? <img
            src={post.thumb_url || post.media_url}
            alt={post.title}
            className="img-fluid rounded"
            style={{ maxWidth: '100%', height: '300px', objectFit: 'cover' }}
          /> : '' }
        </div>

        <div className="d-flex justify-content-start mt-3">
          <div className="d-flex align-items-center me-4">
            {isLiked ? (
              <i className="bi bi-heart-fill" onClick={handleLike} style={{ fontSize: '1.8rem', color: 'red', cursor: 'pointer' }}></i>
            ) : (
              <i className="bi bi-heart" onClick={handleLike} style={{ fontSize: '1.8rem', cursor: 'pointer' }}></i>
            )}
            <div className="ms-2">
              <strong>{likesCount}</strong>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <i className="bi bi-chat" style={{ fontSize: '1.8rem' }} onClick={handleCommentsClick}></i>
            <div className="ms-2">
              <strong>{post.comments_count}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
