import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../context/AuthContext";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import "../components/Comment.css";
import "./PostDetailPage.css";

const PostDetailPage = () => {
  const [upvoting, setUpvoting] = useState(false);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  // Comments state
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentError, setCommentError] = useState("");
  const [postingComment, setPostingComment] = useState(false);

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

  useEffect(() => {
    const fetchComments = async () => {
      setCommentsLoading(true);
      setCommentError("");
      const { data, error } = await supabase
        .from("comments")
        .select("*,profiles:author_id (username)")
        .eq("post_id", id)
        .order("created_at", { ascending: true });
      if (error) {
        setCommentError("Could not fetch comments.");
        setComments([]);
      } else {
        // Map username from profiles join
        setComments(
          data.map((c) => ({
            ...c,
            username: c.profiles?.username || "unknown",
          }))
        );
      }
      setCommentsLoading(false);
    };
    if (id) fetchComments();
  }, [id]);

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

  const handleAddComment = async (content) => {
    if (!user) return;
    setPostingComment(true);
    setCommentError("");
    const { error } = await supabase.from("comments").insert({
      post_id: id,
      author_id: user.id,
      content,
    });
    if (error) {
      setCommentError("Could not post comment.");
    } else {
      // Refresh comments
      // TODO: Repeats the code in the useEffect. Should I make into a function?
      const { data } = await supabase
        .from("comments")
        .select("*,profiles:author_id (username)")
        .eq("post_id", id)
        .order("created_at", { ascending: true });
      setComments(
        data.map((c) => ({
          ...c,
          username: c.profiles?.username || "unknown",
        }))
      );
    }
    setPostingComment(false);
  };

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
          <div className="username-date-container">
            <span className="post-username">@{post.profiles.username}</span>
            <span>Created: {new Date(post.created_at).toLocaleString()}</span>
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
        {/* Comments */}
        <div className="comments-section">
          <h3>Comments</h3>
          {commentsLoading ? (
            <div>Loading comments...</div>
          ) : comments.length === 0 ? (
            <div>No comments yet.</div>
          ) : (
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          )}
          {commentError && <div className="comment-error">{commentError}</div>}
          {user ? (
            <CommentForm onSubmit={handleAddComment} loading={postingComment} />
          ) : (
            <div className="comment-login">Log in to add a comment.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;