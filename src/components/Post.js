import axios from 'axios';

function Post({ post }) {
    const toggleLike = async (postId) => {
        const likeData = {
          resource_type: "Post",
          resource_id: postId,
        };
        try {
          const response = await axios.post('http://localhost:3000/api/v1/likes', likeData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              token: `${localStorage.getItem('token')}`,
            },
          });
          
          if (response.status === 200) {
            const button = document.getElementById(`like-button-${postId}`);
            button.textContent = response.data.message === 'Liked' ? 'Dislike' : 'Like'
          }
        } catch (err) {
        } finally {
        }
    };

    return <div key={post.post_id} className="post">
        <h3>{post.title}</h3>
        <div className="meta">
        <span>Likes: {post.likes_count}</span>
        <span>Comments: {post.comments_count}</span>
        </div>
        <p>{post.created_at}</p>
        <p>Author: {post.author.name}</p>
        <button
        id={`like-button-${post.post_id}`}
        onClick={() => toggleLike(post.post_id, `like-button-${post.post_id}`)}
        className="like-button"
        >
        {post.liked ? 'Dislike' : 'Like'}
        </button>
    </div>
};

export default Post;