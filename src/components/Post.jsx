import React from "react";
import { useNavigate } from "react-router-dom";
import "./Post.css";

const Post = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  // Format creation time
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMins = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMins} minute${diffInMins !== 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <div className="post-card" onClick={handleClick}>
      <div className="post-header">
        <h3 className="post-title">{post.title}</h3>
        <span className="post-time">{formatDate(post.created_at)}</span>
      </div>
      <div className="post-footer">
        <div className="upvotes">
          <span className="upvote-icon">⬆</span>
          <span className="upvote-count">{post.upvotes || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
