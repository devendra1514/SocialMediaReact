import { useEffect, useState } from "react";
import apiCall from "./apiService";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  const getPosts = async () => {
    const response = await apiCall(`api/v1/posts?page=${page}`);
    if (response.status === 200) {
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
    }
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  return (
    <div className="d-flex flex-column m-5 gap-3 align-items-center">
      <button
        className="btn btn-primary mt-3 mb-3"
        onClick={() => navigate('/posts/new') }
      >
        Upload Post
      </button>
      {posts.map((postData) => (
        <PostCard key={postData.post_id} post={postData} />
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

export default Posts;
