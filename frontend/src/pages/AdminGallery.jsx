import { useEffect, useState, useRef } from "react";
import Layout from "../layout/Layout";
import "../styles/gallery.css";

const AdminGallery = () => {
  const API = "http://localhost:5000/api/gallery";

  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileRef = useRef();

  // ================= LOAD =================
  const loadGallery = async () => {
    const res = await fetch(`${API}/gallery`);
    const data = await res.json();
    setImages(data);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  // ================= FILE PREVIEW =================
  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);

    if (f) {
      setPreview(URL.createObjectURL(f));
    }
  };

  // ================= UPLOAD =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    const res = await fetch(`${API}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    // RESET
    setTitle("");
    setFile(null);
    setPreview(null);

    if (fileRef.current) {
      fileRef.current.value = ""; // 🔥 reset file input
    }

    loadGallery();
  };

  // ================= DELETE =================
  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    await fetch(`${API}/gallery/${id}`, {
      method: "DELETE",
    });

    loadGallery();
  };

  return (
    <Layout>
      <div className="gallery-container">

        <h2>✨ Admin Media Gallery</h2>

        {/* ================= UPLOAD ================= */}
        <div className="upload-card">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Image Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              type="file"
              ref={fileRef}
              onChange={handleFile}
              required
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="preview-img"
              />
            )}

            <button type="submit">🚀 Upload Image</button>
          </form>
        </div>

        {/* ================= GALLERY ================= */}
        <div className="gallery">
          {images.map((img) => (
            <div className="card" key={img._id}>

              {/* 🔥 IMAGE BOX (IMPORTANT) */}
              <div className="image-box">
                <img
                  src={`http://localhost:5000/uploads/${img.filename}`}
                  alt={img.title}
                />
              </div>

              {/* TITLE OVERLAY */}
              <div className="title-overlay">
                {img.title}
              </div>

              {/* DELETE BUTTON */}
              <div className="actions">
                <button
                  className="delete-btn"
                  onClick={() => deleteImage(img._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
};

export default AdminGallery;