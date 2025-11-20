import { useState, useEffect } from "react";
import "./HomePage.css";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { supabase } from "../services/supabaseClient";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedFlag, setSelectedFlag] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      let query = supabase
        .from("posts")
        .select(`*,profiles:author_id (username)`)
        .eq("is_deleted", false);

      //let query = supabase.from("posts").select("*").eq("is_deleted", false);

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
    fetchPosts();
  }, [searchInput, selectedFlag, sortBy]);

  return (
    <div className="home-page">
      <Navbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectedFlag={selectedFlag}
        setSelectedFlag={setSelectedFlag}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
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
