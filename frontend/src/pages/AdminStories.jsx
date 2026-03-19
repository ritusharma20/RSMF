import { useEffect, useState } from "react";
import "../styles/stories.css";
import Layout from "../layout/Layout";

const AdminStories = () => {
  const API = "http://localhost:5000/api/stories";

  const [stories, setStories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: ""
  });
  const [image, setImage] = useState(null);

  // Load stories from backend
  const loadStories = async () => {
    try {
      const res = await fetch(`${API}/all`);
      const data = await res.json();
      setStories(data.stories || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("image", image);

    try {
      const res = await fetch(`${API}/add`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      alert(data.message);

      setForm({ title: "", description: "" });
      setImage(null);
      loadStories();
    } catch (err) {
      alert("Error uploading story");
    }
  };

  // Delete story
  const deleteStory = async (id) => {
    if (!window.confirm("Delete this story?")) return;
    try {
      await fetch(`${API}/delete/${id}`, {
        method: "DELETE"
      });
      loadStories();
    } catch (err) {
      alert("Error deleting story");
    }
  };

  return (
    <Layout>
      <div className="story-container">
        <h2>✨ Admin - Stories of Change</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Enter Description"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <button type="submit">🚀 Upload Story</button>
        </form>

        {/* Story List */}
        <div className="story-list">
          {stories.map((story, idx) => (
            <div
              className={`story ${true ? "visible" : ""}`}
              key={story._id}
            >
              <img
                src={`http://localhost:5000/uploads/stories/${story.image}`}
                alt={story.title}
              />
              <div className="story-content">
                <h4>{story.title}</h4>
                <p>{story.description}</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteStory(story._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminStories;