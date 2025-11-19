import { useState, useEffect } from "react";

import "./PostForm.css";

const PostFormEdit = ({
  initialData = {},
  onSubmit,
  submitButtonText = "Submit",
  loading = false,
}) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [imageUrl, setImageUrl] = useState(initialData.image_url || "");
  const [videoUrl, setVideoUrl] = useState(initialData.video_url || "");
  const [selectedFlags, setSelectedFlags] = useState(initialData.flags || []);
  const [flagError, setFlagError] = useState("");

  // TODO: FIx this and remove warnings
  
// eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
  useEffect(() => {
    setTitle(initialData.title || "");
    setContent(initialData.content || "");
    setImageUrl(initialData.image_url || "");
    setVideoUrl(initialData.video_url || "");
    setSelectedFlags(initialData.flags || []);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate at least one flag is selected
    if (selectedFlags.length === 0) {
      setFlagError("Please select at least one event type");
      return;
    }

    setFlagError("");
    onSubmit({
      title,
      content,
      image_url: imageUrl || null,
      video_url: videoUrl || null,
      flags: selectedFlags,
    });
  };

  const handleFlagChange = (flag) => {
    setSelectedFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );
    setFlagError("");
  };

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter post title"
          />
        </div>

        {/* Content */}
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter post content (optional)"
            rows="5"
          />
        </div>

        {/* Image URL */}
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg (optional)"
          />

          {/* VideUrl */}
          <div className="form-group">
            <label htmlFor="videoUrl">Video URL</label>
            <input
              type="url"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/... (optional)"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Flags </label>
          <div className="flags-container">
            <label>
              <input
                type="checkbox"
                value="concert"
                checked={selectedFlags.includes("concert")}
                onChange={() => handleFlagChange("concert")}
              />
              🎵 Concert
            </label>

            <label>
              <input
                type="checkbox"
                value="sports"
                checked={selectedFlags.includes("sports")}
                onChange={() => handleFlagChange("sports")}
              />
              ⚽ Sports
            </label>

            <label>
              <input
                type="checkbox"
                value="social"
                checked={selectedFlags.includes("social")}
                onChange={() => handleFlagChange("social")}
              />
              🎉 Social
            </label>
          </div>
          {flagError && <span className="field-error">{flagError}</span>}
        </div>

        <button
          type="submit"
          disabled={loading || !title || selectedFlags.length === 0}
        >
          {loading ? "Submitting..." : submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default PostFormEdit;
