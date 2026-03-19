import { useEffect, useState } from "react";
import "../styles/team.css";   // 👈 yaha
import Layout from "../layout/Layout";

const AdminTeam = () => {
  const BASE_URL = "http://localhost:5000";

  const [team, setTeam] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    description: ""
  });
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState("");

  // 🔥 LOAD DATA
  const loadTeam = async () => {
    const res = await fetch(`${BASE_URL}/api/team`);
    const data = await res.json();
    setTeam(data);
  };

  useEffect(() => {
    loadTeam();
  }, []);

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("role", form.role);
    formData.append("description", form.description);

    if (image) {
      formData.append("image", image);
    }

    if (editId) {
      await fetch(`${BASE_URL}/api/team/${editId}`, {
        method: "PUT",
        body: formData
      });
    } else {
      await fetch(`${BASE_URL}/api/team`, {
        method: "POST",
        body: formData
      });
    }

    setForm({ name: "", role: "", description: "" });
    setImage(null);
    setEditId("");
    loadTeam();
  };

  // 🔥 EDIT
  const handleEdit = (t) => {
    setEditId(t._id);
    setForm({
      name: t.name,
      role: t.role,
      description: t.description
    });
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    await fetch(`${BASE_URL}/api/team/${id}`, {
      method: "DELETE"
    });

    loadTeam();
  };

  return (
    <Layout>
      <div className="admin-team-container">

        <h1>Team Panel</h1>

        {/* FORM */}
        <div className="form-box">
          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="role"
              placeholder="Enter Role"
              value={form.role}
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
            />

            <button type="submit">
              {editId ? "Update Member" : "Add Member"}
            </button>

          </form>
        </div>

        {/* TEAM LIST */}
        <div className="team-grid">
          {team.map((t) => (
            <div className="team-card" key={t._id}>

              <img
                src={t.image ? `http://localhost:5000/${t.image}` : "https://via.placeholder.com/300"}
                alt=""
              />

              <div className="team-content">
                <h3>{t.name}</h3>
                <span>{t.role}</span>
                <p>{t.description}</p>

                <div className="actions">
                  <button className="edit" onClick={() => handleEdit(t)}>
                    Edit
                  </button>

                  <button className="delete" onClick={() => handleDelete(t._id)}>
                    Delete
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
};

export default AdminTeam;