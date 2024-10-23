import { useEffect, useState } from "react";
import apiCall from "./apiService";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";

function Comments() {
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
  const { resource_type, resource_id } = useParams();

  const getComments = async () => {
    const response = await apiCall(`/api/v1/comments?resource_type=${resource_type}&resource_id=${resource_id}&page=${page}`, 'GET');
    if (response.status === 200) {
      setComments((prevComments) => [...prevComments, ...response.data.comments]);
    }
  };

  useEffect(() => {
    getComments();
  }, [page, resource_type, resource_id]);

  return (
    <div className="container mt-5">
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
  );
}

export default Comments;
