import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import "../styles/AdminBlog.css";

const API = "http://localhost:5000/api/news";

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [selected, setSelected] = useState(null); // ✅ modal

  // LOAD
  const loadNews = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setNews(data);
  };

  useEffect(() => {
    loadNews();
  }, []);

  // IMAGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    await fetch(API, {
      method: "POST",
      body: formData,
    });

    setTitle("");
    setDescription("");
    setImage(null);
    setPreview(null);
    loadNews();
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadNews();
  };

  return (
    <Layout>
      <div className="page">

        {/* FORM */}
        <div className="card">
          <h2>Add News</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Write news description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: "120px" }}
            />

            <input type="file" onChange={handleImageChange} />

            {preview && <img src={preview} className="preview" />}

            <button>Upload</button>
          </form>
        </div>

        {/* GRID */}
        <div className="grid">
          {news.map((b) => (
            <div className="blog-card" key={b._id}>

              <div className="thumb">
                <img src={`http://localhost:5000/uploads/${b.image}`} />

                <span>
                  {new Date(b.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </span>
              </div>

              <div className="content">
                <h4>{b.title}</h4>

                <p className={b.description.length > 120 ? "clamp" : ""}>
                  {b.description}
                </p>

                {/* Read More only if long */}
                {b.description.length > 120 && (
                  <button onClick={() => setSelected(b)}>
                    Read More
                  </button>
                )}

                <button onClick={() => handleDelete(b._id)}>
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* MODAL */}
        {selected && (
          <div className="modal" onClick={() => setSelected(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>{selected.title}</h3>

              <img src={`http://localhost:5000/uploads/${selected.image}`} />

              <p>{selected.description}</p>

              <button onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default AdminNews;