import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import "../styles/volunteers.css"; // CSS we'll keep same as your HTML

const API = "http://localhost:5000/api/volunteers";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState("");
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // Load volunteers
  const loadVolunteers = async () => {
    try {
      const res = await fetch(`${API}/all`);
      const data = await res.json();
      setVolunteers(data.volunteers || []);
    } catch (err) {
      console.error(err);
      alert("Error loading data");
    }
  };

  useEffect(() => {
    loadVolunteers();
  }, []);

  // Add Volunteer
  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch(`${API}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addForm)
    });
    alert("Added Successfully");
    setAddForm({ name: "", email: "", phone: "", interest: "", message: "" });
    setShowAdd(false);
    loadVolunteers();
  };

  // Edit Volunteer
  const handleEdit = (v) => {
    setEditForm({
      id: v._id,
      name: v.name,
      email: v.email,
      phone: v.phone,
      interest: v.interest,
      message: v.message
    });
    setShowEdit(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`${API}/${editForm.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm)
    });
    alert("Updated Successfully");
    setShowEdit(false);
    loadVolunteers();
  };

  // Delete Volunteer
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this volunteer?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    alert("Deleted Successfully");
    loadVolunteers();
  };

  // Search
  const filteredVolunteers = volunteers.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="container">
        <h1>Admin Volunteer Panel</h1>

        {/* ADD FORM */}
        {showAdd && (
          <div className="card">
            <h3>Add Volunteer</h3>
            <form onSubmit={handleAdd}>
              <input
                type="text"
                placeholder="Name"
                required
                value={addForm.name}
                onChange={(e) =>
                  setAddForm({ ...addForm, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={addForm.email}
                onChange={(e) =>
                  setAddForm({ ...addForm, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                value={addForm.phone}
                onChange={(e) =>
                  setAddForm({ ...addForm, phone: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Interest"
                value={addForm.interest}
                onChange={(e) =>
                  setAddForm({ ...addForm, interest: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Message"
                value={addForm.message}
                onChange={(e) =>
                  setAddForm({ ...addForm, message: e.target.value })
                }
              />
              <button type="submit" className="add-btn">
                Add
              </button>
              <button type="button" onClick={() => setShowAdd(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* EDIT FORM */}
        {showEdit && (
          <div className="card">
            <h3>Edit Volunteer</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Interest"
                value={editForm.interest}
                onChange={(e) =>
                  setEditForm({ ...editForm, interest: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Message"
                value={editForm.message}
                onChange={(e) =>
                  setEditForm({ ...editForm, message: e.target.value })
                }
              />
              <button type="submit" className="edit-btn">
                Update
              </button>
              <button type="button" onClick={() => setShowEdit(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* TABLE + SEARCH */}
        <div className="card">
          <h3>All Volunteers</h3>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="add-btn"
            onClick={() => setShowAdd(true)}
            style={{ float: "right", marginBottom: "10px" }}
          >
            Add New Volunteer
          </button>

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
              {filteredVolunteers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Data Found
                  </td>
                </tr>
              ) : (
                filteredVolunteers.map((v) => (
                  <tr key={v._id}>
                    <td>{v.name}</td>
                    <td>{v.email}</td>
                    <td>{v.phone}</td>
                    <td>{v.interest}</td>
                    <td>{v.message}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(v)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(v._id)}
                      >
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
    </Layout>
  );
};

export default Volunteers;