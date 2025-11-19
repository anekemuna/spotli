import { useState, useEffect } from "react";
import "./HomePage.css";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { supabase } from "../services/supabaseClient";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("is_deleted", false)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="posts-container">
        {loading && <p className="loading-message">Loading posts...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="no-posts-message">
            No posts yet. Be the first to create one!
          </p>
        )}
        {!loading && !error && posts.length > 0 && (
          <div className="posts-feed">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
