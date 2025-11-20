import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabaseClient";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);
      setError("");
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();
      if (error) {
        setError("Could not fetch profile.");
      } else {
        setUsername(data.username);
        setNewUsername(data.username);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleChangeUsername = async (e) => {
    e.preventDefault();
    if (!newUsername || newUsername === username) return;
    setLoading(true);
    setError("");
    setSuccess("");
    const { error } = await supabase
      .from("profiles")
      .update({ username: newUsername })
      .eq("id", user.id);
    if (error) {
      setError("Could not update username.");
    } else {
      setUsername(newUsername);
      setSuccess("Username updated!");
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="profile-page">
        <h2>Profile</h2>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="wrapper">
    <div className="profile-page">
      <h2>Profile</h2>
      <div className="profile-info">
        <div className="profile-label">Current Username:</div>
        <div className="profile-username">@{username}</div>
      </div>
      <form className="profile-form" onSubmit={handleChangeUsername}>
        <label htmlFor="newUsername">Change Username:</label>
        <input
          type="text"
          id="newUsername"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          disabled={loading}
          minLength={3}
          maxLength={20}
          required
        />
        <button
          type="submit"
          disabled={loading || !newUsername || newUsername === username}
        >
          {loading ? "Updating..." : "Update Username"}
        </button>
      </form>
      {error && <div className="profile-error">{error}</div>}
      {success && <div className="profile-success">{success}</div>}
    </div> </div>
  );
};

export default Profile;
