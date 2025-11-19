import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabaseClient";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import "./MyPostsPage.css";

const MyPostsPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedFlag, setSelectedFlag] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (!user) return;
    const fetchMyPosts = async () => {
      setLoading(true);
      let query = supabase
        .from("posts")
        .select("*")
        .eq("is_deleted", false)
        .eq("author_id", user.id);

      // Filter by flag
      if (selectedFlag !== "all") {
        query = query.contains("flags", [selectedFlag]);
      }

      // Search by title
      if (searchInput.trim() !== "") {
        query = query.ilike("title", `%${searchInput.trim()}%`);
      }

      // Sort
      if (sortBy === "newest") {
        query = query.order("created_at", { ascending: false });
      } else if (sortBy === "oldest") {
        query = query.order("created_at", { ascending: true });
      } else if (sortBy === "popular") {
        query = query.order("upvotes", { ascending: false });
      }

      try {
        const { data, error } = await query;
        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPosts();
  }, [user, searchInput, selectedFlag, sortBy]);

  if (!user) {
    return (
      <div className="my-posts-page">Please log in to view your posts.</div>
    );
  }

  return (
    <div className="my-posts-page">
      <Navbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedFlag={selectedFlag}
        setSelectedFlag={setSelectedFlag}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="posts-container">
        <h2 style={{ marginBottom: "1.5rem" }}>My Posts</h2>
        {loading && <p className="loading-message">Loading your posts...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="no-posts-message">You haven't created any posts yet.</p>
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

export default MyPostsPage;
