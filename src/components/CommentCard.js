import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiCall from './apiService';
import { useNavigate } from 'react-router-dom';

const CommentCard = ({ comment, childComment = true }) => {
  const [isLiked, setIsLiked] = useState(comment.liked);
  const [likesCount, setLikesCount] = useState(comment.likes_count);
  const navigate = useNavigate();

  const handleLike = async (e) => {
    e.preventDefault();

    const likeData = {
      resource_type: 'Comment',
      resource_id: comment.comment_id,
    };

    // Change in frontend
    setIsLiked(comment.liked === true ? false : true);
    comment.liked = comment.liked === true ? false : true
    setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));

    const response = await apiCall('api/v1/likes', 'POST', likeData);

    // Change from backend
    const updatedLikedStatus = response.data.message === 'Liked';
    setIsLiked(updatedLikedStatus);
    comment.liked = updatedLikedStatus;
    setLikesCount(response.data.comment.likes_count);
  };

  const handleCommentsClick = () => {
    navigate(`/child_comments/Comment/${comment.comment_id}`);
  };

  return (
    <div className="card mb-4 shadow-sm border-1">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={comment.author.thumb_url}
            alt={comment.name}
            className="rounded-circle me-3"
            style={{ width: '50px', height: '50px' }}
          />
          <div>
            <h6 className="mb-0">{comment.author.name}</h6>
            <small className="text-muted">@{comment.author.username}</small>
          </div>

          <span className="ms-auto text-muted">{comment.created_at}</span>
        </div>

        <h6 className="card-title">{comment.title}</h6>

        <div className="text-center my-3">
          { comment.thumb_url ? <img
            src={comment.thumb_url || comment.media_url}
            alt={''}
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

          { childComment ? (comment.level === 1 ? null : <div className="d-flex align-items-center">
            <i className="bi bi-chat" style={{ fontSize: '1.8rem', cursor: 'pointer' }} onClick={handleCommentsClick}></i>
            <div className="ms-2">
              <strong>{comment.comments_count}</strong>
            </div>
          </div>) : null }
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
