import React, { useEffect, useState } from "react";
import "../styles/Volunteers.css";
import Layout from "../layout/Layout";

const API = "http://localhost:5000/api/volunteers";

export default function AdminVolunteer() {
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState("");

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

  const loadVolunteers = async () => {
    const res = await fetch(`${API}/all`);
    const data = await res.json();
    setVolunteers(data.volunteers);
  };

  useEffect(() => {
    loadVolunteers();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    await fetch(`${API}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Added Successfully");
    setShowAdd(false);
    setForm({ name: "", email: "", phone: "", interest: "", message: "" });
    loadVolunteers();
  };

  const deleteVolunteer = async (id) => {
    if (!window.confirm("Delete this volunteer?")) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    alert("Deleted Successfully");
    loadVolunteers();
  };

  const fillEdit = (v) => {
    setEditId(v._id);
    setForm(v);
    setShowEdit(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Updated Successfully");
    setShowEdit(false);
    loadVolunteers();
  };

  const filtered = volunteers.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="container volunteer-page"> {/* 🔥 scope added */}

        {showAdd && (
          <div className="card">
            <h3>Add Volunteer</h3>
            <form onSubmit={handleAdd}>
              <input placeholder="Name" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />

              <input type="email" placeholder="Email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />

              <input placeholder="Phone" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />

              <input placeholder="Interest" value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })} />

              <input placeholder="Message" value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })} />

              <button className="add-btn">Add</button>
              <button type="button" onClick={() => setShowAdd(false)}>Cancel</button>
            </form>
          </div>
        )}

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
              <button type="button" onClick={() => setShowEdit(false)}>Cancel</button>
            </form>
          </div>
        )}

        <div className="card">
          <h2>All Volunteers</h2>

          <div className="top-bar">
            <div>
              <input
                className="search-input"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>Search</button>
            </div>

            <button onClick={() => setShowAdd(true)} className="add-btn">
              Add New Volunteer
            </button>
          </div>
<div className ="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Interest</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6">No Data Found</td>
                </tr>
              ) : (
                filtered.map((v) => (
                  <tr key={v._id}>
                    <td>{v.name}</td>
                    <td>{v.email}</td>
                    <td>{v.phone}</td>
                    <td>{v.interest}</td>
                    <td>{v.message}</td>
                    <td>
                      <button className="edit-btn" onClick={() => fillEdit(v)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => deleteVolunteer(v._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>

      </div>
    </Layout>
  );
}