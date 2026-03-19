import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
// import "../styles/donor.css";

const Donations = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/donor/admin")
      .then(res => res.json())
      .then(data => setDonors(data))
      .catch(err => {
        console.error(err);
        alert("Failed to load donors");
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this donor?")) return;

    try {
      await fetch(`http://localhost:5000/api/donor/${id}`, {
        method: "DELETE"
      });

      setDonors(donors.filter(d => d._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <Layout>
        <div className="donation-page">

      <div className="card">
        <h2>Donor List</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>SI.no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Donation Amount (₹)</th>
                <th>Message</th>
                <th>Submitted At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donors.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>No Data Found</td>
                </tr>
              ) : (
                donors.map((d, i) => (
                  <tr key={d._id}>
                    <td>{i + 1}</td>
                    <td>{d.name}</td>
                    <td>{d.email}</td>
                    <td>{d.phone || "-"}</td>
                    <td>{d.address || "-"}</td>
                    <td>{d.donationAmount || 0}</td>
                    <td>{d.message || "-"}</td>
                    <td>{new Date(d.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-red" onClick={() => handleDelete(d._id)}>Delete</button>
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
};

export default Donations;