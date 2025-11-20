import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import "./PostDetailPage.css";

const PostDetailPage = () => {
  const [upvoting, setUpvoting] = useState(false);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError("");
      const { data, error } = await supabase
        .from("posts")
        .select(`*,profiles:author_id (username)`)
        .eq("id", id)
        .eq("is_deleted", false)
        .single();
      if (error) {
        setError("Post not found or an error occurred.");
        setPost(null);
      } else {
        setPost(data);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="post-detail-loading">Loading...</div>;
  if (error) return <div className="post-detail-error">{error}</div>;
  if (!post) return null;

  const handleUpvote = async () => {
    if (upvoting) return;
    setUpvoting(true);
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: (post.upvotes || 0) + 1 })
      .eq("id", post.id)
      .select();
    if (!error && data && data.length > 0) {
      setPost({ ...post, upvotes: data[0].upvotes });
    }
    setUpvoting(false);
  };

  return (
    <div className="post-detail-wrapper">
      <div className="post-detail-page">
        <button
          className="back-btn"
          onClick={() =>
            window.history.length > 1
              ? window.history.back()
              : window.location.assign("/")
          }
        >
          ← Back
        </button>
        <h2 className="post-detail-title">{post.title}</h2>
        <div
          className="post-detail-meta"
          
        >
          <div className="username-date-container">
            <span className="post-username">
              @{post.profiles.username}
            </span>
            <span>
              Created: {new Date(post.created_at).toLocaleString()}
            </span>
          </div>
          <div>
            <span>Upvotes: {post.upvotes}</span>
            <button
              className="upvote-btn"
              onClick={handleUpvote}
              disabled={upvoting}
            >
              ⬆ Upvote
            </button>
          </div>
          <div className="flags-container">
            <span>Flags:</span>
            {Array.isArray(post.flags) && post.flags.length > 0 ? (
              post.flags.map((flag, idx) => (
                <span key={idx} className="post-detail-flags">
                  {flag}
                </span>
              ))
            ) : (
              <span className="post-detail-flags">None</span>
            )}
          </div>
        </div>
        {(post.image_url || post.video_url) && (
          <div className="post-detail-media">
            {post.image_url && <img src={post.image_url} alt="Post" />}
            {post.video_url && <video controls src={post.video_url} />}
          </div>
        )}
        <div className="post-detail-content">
          <h4>Content:</h4>
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
