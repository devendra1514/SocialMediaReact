import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiCall from './apiService';

const MomentCard = ({ moment }) => {
  const [isLiked, setIsLiked] = useState(moment.liked);
  const [likesCount, setLikesCount] = useState(moment.likes_count);

  const handleLike = async () => {
    const likeData = {
      resource_type: 'Moment',
      resource_id: moment.moment_id,
    };

    // Change in frontend
    setIsLiked(moment.liked === true ? false : true);
    moment.liked = moment.liked === true ? false : true
    setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));

    const response = await apiCall('api/v1/likes', 'POST', likeData);

    // Change from backend
    const updatedLikedStatus = response.data.message === 'Liked';
    setIsLiked(updatedLikedStatus);
    moment.liked = updatedLikedStatus;
    setLikesCount(response.data.resourced.likes_count);
  };

  return (
    <div className="card mb-4 shadow-sm border-1">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={moment.author.avatar_url}
            alt={moment.name}
            className="rounded-circle me-3"
            style={{ width: '50px', height: '50px' }}
          />
          <div>
            <h6 className="mb-0">{moment.author.name}</h6>
            <small className="text-muted">@{moment.author.username}</small>
          </div>
          <span className="ms-auto text-muted">{moment.created_at}</span>
        </div>

        <h6 className="card-title">{moment.title}</h6>

        <div className="text-center my-3">
          <video
            src={moment.media_url}
            controls
            className="img-fluid rounded"
            style={{ maxWidth: '100%', height: '300px', objectFit: 'cover' }}
          />
        </div>

        <div className="d-flex justify-content-start mt-3">
          <div className="d-flex align-items-center me-4">
            {isLiked ? (
              <i
                className="bi bi-heart-fill"
                onClick={handleLike}
                style={{ fontSize: '1.8rem', color: 'red', cursor: 'pointer' }}
              ></i>
            ) : (
              <i
                className="bi bi-heart"
                onClick={handleLike}
                style={{ fontSize: '1.8rem', cursor: 'pointer' }}
              ></i>
            )}
            <div className="ms-2">
              <strong>{likesCount}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MomentCard;