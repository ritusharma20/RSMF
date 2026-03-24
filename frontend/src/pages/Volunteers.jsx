import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import "../styles/Volunteers.css";

const API = "http://localhost:5000/api/volunteers";

const AdminVolunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const [editId, setEditId] = useState("");

  // 🔄 LOAD
  const loadVolunteers = async () => {
    const res = await fetch(`${API}/all`);
    const data = await res.json();
    setVolunteers(data.volunteers || []);
  };

  useEffect(() => {
    loadVolunteers();
  }, []);

  // ➕ ADD
  const handleAdd = async (e) => {
    e.preventDefault();

    await fetch(`${API}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, status: "approved" }),
    });

    alert("Added Successfully ✅");
    setShowAdd(false);
    setForm({ name: "", email: "", phone: "", interest: "", message: "" });
    loadVolunteers();
  };

  // ❌ DELETE
  const deleteVolunteer = async (id) => {
    if (!window.confirm("Delete this volunteer?")) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    alert("Deleted ❌");
    loadVolunteers();
  };

  // ✏️ EDIT
  const fillEdit = (v) => {
    setEditId(v._id);
    setForm(v);
    setShowEdit(true);
  };

  // 🔄 UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Updated 🔄");
    setShowEdit(false);
    loadVolunteers();
  };

  // ✅ ACCEPT
  const acceptVolunteer = async (id) => {
    await fetch(`${API}/accept/${id}`, { method: "PUT" });
    alert("Approved ✅");
    loadVolunteers();
  };

  // ❌ REJECT
  const rejectVolunteer = async (id) => {
    if (!window.confirm("Reject this volunteer?")) return;

    await fetch(`${API}/reject/${id}`, { method: "DELETE" });
    alert("Rejected ❌");
    loadVolunteers();
  };

  // 🔍 FILTER
  const filtered = volunteers.filter((v) => {
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase());

    if (filter === "pending") return v.status === "pending" && matchSearch;
    if (filter === "approved") return v.status === "approved" && matchSearch;

    return matchSearch;
  });

  return (
    <Layout>
      <div className="container volunteer-page">

        {/* TOP BAR */}
        <div className="top-bar">
          <div>
            <input
              className="search-input"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-btns">
  <button className="edit-btn" onClick={() => setFilter("all")}>All</button>
  <button onClick={() => setFilter("pending")}>Pending</button>
  <button className="add-btn" onClick={() => setFilter("approved")}>Approved</button>
</div>

          <button onClick={() => setShowAdd(true)} className="add-btn">
            Add Volunteer
          </button>
        </div>

        {/* ADD FORM */}
        {showAdd && (
          <div className="card">
            <h3>Add Volunteer</h3>
            <form onSubmit={handleAdd}>
              <input placeholder="Name" required
                onChange={(e) => setForm({ ...form, name: e.target.value })} />

              <input placeholder="Email" required
                onChange={(e) => setForm({ ...form, email: e.target.value })} />

              <input placeholder="Phone"
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />

              <input placeholder="Interest"
                onChange={(e) => setForm({ ...form, interest: e.target.value })} />

              <input placeholder="Message"
                onChange={(e) => setForm({ ...form, message: e.target.value })} />

              <button className="add-btn">Save</button>
            </form>
          </div>
        )}

        {/* EDIT FORM */}
        {showEdit && (
          <div className="card">
            <h3>Edit Volunteer</h3>
            <form onSubmit={handleUpdate}>
              <input value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />

              <input value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />

              <input value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />

              <input value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })} />

              <input value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })} />

              <button className="edit-btn">Update</button>
            </form>
          </div>
        )}

        {/* TABLE */}
        <div className="card">
          <h2>Volunteers</h2>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                  <th>Interest</th> {/* 🔥 ADD */}

                <th>Status</th>
                <th>CV</th> {/* 🔥 NEW */}
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6">No Data</td>
                </tr>
              ) : (
                filtered.map((v) => (
                  <tr key={v._id}>
                    <td>{v.name}</td>
                    <td>{v.email}</td>
                    <td>{v.phone}</td>
<td>{v.interest || "N/A"}</td>
                    <td>
                      {v.status === "pending" ? "⏳ Pending" : "✅ Approved"}
                    </td>

                    {/* 🔥 CV COLUMN */}
                    {/* <td>
  {v.cv ? (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <a
        href={`http://localhost:5000/uploads/cv/${v.cv}`}
        target="_blank"
        rel="noreferrer"
      >
        <button className="edit-btn">View</button>
      </a>
    </div>
  ) : (
    "No CV"
  )}
</td> */}

<td>
  {v.cv ? (
    <a
      href={`http://localhost:5000/uploads/cv/${v.cv}`}
      target="_blank"
      rel="noreferrer"
      style={{ color: "#007bff", textDecoration: "none", fontWeight: "500" }}
    >
      View 
    </a>
  ) : (
    "No CV"
  )}
</td>
                    <td>
                      {v.status === "pending" && (
                        <>
                          <button className="add-btn" onClick={() => acceptVolunteer(v._id)}>
                            Accept
                          </button>
                          <button onClick={() => rejectVolunteer(v._id)}>
                            Reject
                          </button>
                        </>
                      )}

                      {v.status === "approved" && (
                        <>
                          <button className="edit-btn" onClick={() => fillEdit(v)}>
                            Edit
                          </button>
                          <button className="delete-btn" onClick={() => deleteVolunteer(v._id)}>
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  );
};

export default AdminVolunteer;