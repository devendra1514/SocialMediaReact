import { useEffect, useState } from "react";
import apiCall from "./apiService";
import PostCard from "./PostCard";

function Posts() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

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
    <div className="container mt-5">
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
