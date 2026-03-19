import { useEffect, useState } from "react";
import "../styles/reports.css";
import Layout from "../layout/Layout";

const AdminReports = () => {
  const API = "http://localhost:5000/api/reports";

  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: ""
  });
  const [pdf, setPdf] = useState(null);
  const [editId, setEditId] = useState("");

  // LOAD DATA
  const loadData = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (pdf) formData.append("pdf", pdf);

    try {
      if (editId) {
        await fetch(`${API}/${editId}`, { method: "PUT", body: formData });
        setEditId("");
      } else {
        await fetch(API, { method: "POST", body: formData });
      }

      setForm({ title: "", description: "" });
      setPdf(null);
      loadData();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (r) => {
    setEditId(r._id);
    setForm({ title: r.title, description: r.description });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadData();
  };

  const viewPDF = (file) => {
    window.open(`http://localhost:5000/uploads/pdfs/${file}`, "_blank");
  };

  return (
    <Layout>
      <div className="report-form-box">
        <h3>{editId ? "Update Report" : "Add Report"}</h3>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        ></textarea>

        <label>PDF</label>
        <input type="file" onChange={(e) => setPdf(e.target.files[0])} />

        <button onClick={handleSubmit}>
          {editId ? "Update" : "Submit"}
        </button>
      </div>

      <div className="table-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Title</th>
              <th>Description</th>
              <th>PDF</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((r, i) => (
              <tr key={r._id}>
                <td>{i + 1}</td>
                <td>{r.title}</td>
                <td>{r.description}</td>

                <td>
                  {r.pdf ? (
                    <button
                      className="action-btn pdf-btn"
                      onClick={() => viewPDF(r.pdf)}
                    >
                      View PDF
                    </button>
                  ) : (
                    "No PDF"
                  )}
                </td>

                <td>
                  <button
                    className="action-btn edit"
                    onClick={() => handleEdit(r)}
                  >
                    Edit
                  </button>

                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(r._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AdminReports;