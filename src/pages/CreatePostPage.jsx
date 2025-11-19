import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabaseClient";
import PostForm from "../components/PostForm";

import "./CreatePostPage.css"

const CreatePostPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreatePost = async (formData) => {
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase
        .from("posts")
        .insert([{ ...formData, author_id: user.id }]);

      if (error) throw error;
      navigate("/"); // TODO: I need to update to take to post detail page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <h2>Create Post</h2>
      {error && <div className="error">{error}</div>}
      <PostForm
        onSubmit={handleCreatePost}
        submitButtonText="Create Post"
        loading={loading}
      />
    </div>
  );
};

export default CreatePostPage;
