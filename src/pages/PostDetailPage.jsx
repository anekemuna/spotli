import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import "./PostDetailPage.css";

const PostDetailPage = () => {
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
        .select("*")
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
        <div className="post-detail-meta">
          <span>Created: {new Date(post.created_at).toLocaleString()}</span>
          <span>Upvotes: {post.upvotes}</span>
          <span>
            Flags:
            {Array.isArray(post.flags) && post.flags.length > 0 ? (
              post.flags.map((flag, idx) => (
                <span key={idx} className="post-detail-flags">
                  {flag}
                </span>
              ))
            ) : (
              <span className="post-detail-flags">None</span>
            )}
          </span>
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
