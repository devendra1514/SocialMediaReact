import { useEffect, useState } from "react";
import apiCall from "./apiService";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";

function ChildComments() {
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(null);
  const { resource_id } = useParams();
  const [title, setTitle] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);

  const getComments = async () => {
    const response = await apiCall(`/api/v1/comments?resource_type=Comment&resource_id=${resource_id}&page=${page}`, 'GET');
    if (response.status === 200) {
      setComments((prevComments) => [...prevComments, ...response.data.comments]);
    }
  };

  const getComment = async () => {
    const response = await apiCall(`/api/v1/comments/${resource_id}`, 'GET');
    if (response.status === 200) {
      setComment(response.data)
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages({});
    setLoading(true)

    const formData = new FormData();
    formData.append('title', title);
    formData.append('resource_type', 'Comment');
    formData.append('resource_id', resource_id);
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    const response = await apiCall('api/v1/comments', 'POST', formData, true);

    if (response.status === 200) {
      alert('Comment uploaded successfully!');
      window.location.reload();
    } else if (response.status === 422) {
      setErrorMessages(response.data.error);
    }
  };

  useEffect(() => {
    getComments();
    getComment();
  }, [page, resource_id]);

  return (
    
    <div className="container mt-5">
      { comment && comment.level >= 1 ? null :
        <div>
          <div className="row justify-content-center">
            {comment ? <CommentCard key={comment.comment_id} comment={comment} childComment={false} /> : null}
            <div className="col-md-6">
              <div className="card p-4 shadow">
                <h2 className="text-center mb-4">Add Comment</h2>
                {errorMessages.general && (
                  <div className="alert alert-danger">{errorMessages.general}</div>
                )}
                <form onSubmit={handleCommentSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      id="title"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      />
                    {errorMessages.title && (
                      <p className="text-danger">{errorMessages.title[0]}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    {loading ? 'Committing...' : 'Commit'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {comments.map((commentData) => (
            <CommentCard key={commentData.comment_id} comment={commentData} />
          ))}
          <button
            className="btn btn-primary mt-3"
            onClick={() => setPage((prevPage) => prevPage + 1)}
            >
            Load More
          </button>
        </div>
      }
    </div>
  );
}

export default ChildComments;
