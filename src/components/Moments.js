import React, { useState, useEffect, useRef } from 'react';
import apiCall from './apiService';
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';

function Moments() {
  const [page, setPage] = useState(1);
  const [total_pages, setTotalPages] = useState(0);
  const [moments, setMoments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const swiperRef = useRef(null);

  const getPosts = async () => {
    setLoading(true);
    const response = await apiCall(`api/v1/moments?page=${page}&per_page=2`);
    if (response.status === 200) {
      setTotalPages(response.data.pagination.total_pages);
      setMoments((prevMoments) => [...prevMoments, ...response.data.moments]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
    if (swiper.activeIndex === moments.length - 1 && !loading) {
      if (page <= total_pages) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  const MomentCard = ({ moment, index }) => {
    const [isLiked, setIsLiked] = useState(moment.liked);
    const [likesCount, setLikesCount] = useState(moment.likes_count);
    const videoRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (index === currentIndex && videoRef.current && videoRef.current.paused) {
                videoRef.current.play().catch((err) => {
                  console.log("Error playing video:", err);
                });
              }
            } else {
              if (videoRef.current) {
                videoRef.current.pause();
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      const videoElement = videoRef.current;
      if (videoElement) {
        observer.observe(videoElement);
      }

      return () => {
        if (videoElement) {
          observer.unobserve(videoElement);
        }
      };
    }, [index, currentIndex]);

    const handleLike = async (e) => {
      e.preventDefault();

      const likeData = {
        resource_type: 'Moment',
        resource_id: moment.moment_id,
      };

      try {
        const response = await apiCall('api/v1/likes', 'POST', likeData);

        const updatedLikedStatus = response.data.message === 'Liked';
        setIsLiked(updatedLikedStatus);
        setLikesCount((prevCount) => (updatedLikedStatus ? prevCount + 1 : prevCount - 1));
      } catch (error) {
        console.error('Error while liking the post:', error);
      }
    };

    return (
      <div className="card mb-4 shadow-sm border-0" style={{ height: '100%' }}>
        <div className="card-body d-flex flex-column justify-content-between" style={{ height: '100%' }}>
          <div className="text-center my-3">
            <video
              ref={videoRef}
              src={moment.media_url}
              controls
              className="img-fluid rounded"
              style={{
                maxWidth: '100%',
                maxHeight: '60vh',
                objectFit: 'cover',
              }}
            />
          </div>

          <div className='d-flex justify-content-between'>
            <div>
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
              </div>
              <h6 className="card-title">{moment.title}</h6>
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
      </div>
    );
  };

  return (
    <div
      className="container-fluid mt-3"
      style={{ height: '88vh', overflow: 'hidden' }} // Adjust 60px to your navbar's height
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        onSlideChange={handleSlideChange}
        className="moment-swiper"
        style={{ height: '100%' }}
        ref={swiperRef}
      >
        {moments.map((moment, index) => (
          <SwiperSlide key={moment.moment_id} style={{ height: '100%' }}>
            <MomentCard moment={moment} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Moments;
