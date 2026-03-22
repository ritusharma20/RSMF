import { useEffect, useState, useRef } from "react";
import Layout from "../layout/Layout";
import styles from "../styles/gallery.module.css"; // ✅ FIXED

const AdminGallery = () => {
  const API = "http://localhost:5000/api/gallery";

  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileRef = useRef();

  const loadGallery = async () => {
    const res = await fetch(`${API}/gallery`);
    const data = await res.json();
    setImages(data);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);

    if (f) {
      setPreview(URL.createObjectURL(f));
    }
  };

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

    setTitle("");
    setFile(null);
    setPreview(null);

    if (fileRef.current) fileRef.current.value = "";

    loadGallery();
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    await fetch(`${API}/gallery/${id}`, {
      method: "DELETE",
    });

    loadGallery();
  };

  return (
    <Layout>
      <div className={styles["gallery-container"]}>

        <h2>✨ Admin Media Gallery</h2>

        {/* UPLOAD */}
        <div className={styles["upload-card"]}>
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
                className={styles["preview-img"]}
              />
            )}

            <button type="submit">🚀 Upload Image</button>
          </form>
        </div>

        {/* GALLERY */}
        <div className={styles.gallery}>
          {images.map((img) => (
            <div className={styles.card} key={img._id}>

              <div className={styles["image-box"]}>
                <img
                  src={`http://localhost:5000/uploads/${img.filename}`}
                  alt={img.title}
                />
              </div>

              <div className={styles["title-overlay"]}>
                {img.title}
              </div>

              <div className={styles.actions}>
                <button
                  className={styles["delete-btn"]}
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