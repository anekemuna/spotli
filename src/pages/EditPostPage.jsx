import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabaseClient";
import PostFormEdit from "../components/PostFormEdit";

const EditPostPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .eq("author_id", user?.id)
        .single();
      if (error || !data) {
        setError("Post not found or you do not have permission to edit.");
        setPost(null);
      } else {
        setPost(data);
      }
      setLoading(false);
    };
    if (user) fetchPost();
  }, [id, user]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setDeleting(true);
    const { error } = await supabase
      .from("posts")
      .update({ is_deleted: true })
      .eq("id", id)
      .eq("author_id", user?.id);
    setDeleting(false);
    if (error) {
      setError("Failed to delete post.");
    } else {
      navigate("/my-posts");
    }
  };

  if (loading) return <div className="edit-post-loading">Loading...</div>;
  if (error) return <div className="edit-post-error">{error}</div>;
  if (!post) return null;

  const handleEditSubmit = async (updatedData) => {
    const { title, content, image_url, video_url, flags } = updatedData;
    const { error } = await supabase
      .from("posts")
      .update({
        title,
        content,
        image_url,
        video_url,
        flags,
      })
      .eq("id", id)
      .eq("author_id", user?.id);
    if (error) {
      setError("Failed to update post.");
    } else {
      navigate("/my-posts");
    }
  };

  return (
    <div className="edit-post-page posts-container">
      <h2>Edit Post</h2>
      {/* TODO: This is a duplicated form component from PostForm, need to fix to keep one component */}
      <PostFormEdit
        initialData={post}
        postId={id}
        submitButtonText="Edit Post"
        onSubmit={handleEditSubmit}
      />
      <button
        className="delete-post-btn"
        onClick={handleDelete}
        disabled={deleting}
        style={{
          marginTop: "2rem",
          background: "var(--color-secondary)",
          color: "#fff",
        }}
      >
        {deleting ? "Deleting..." : "Delete Post"}
      </button>
    </div>
  );
};

export default EditPostPage;
