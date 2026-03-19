import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
// import "../styles/contact.css";

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact/admin");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load contact submissions.");
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <Layout>
      {/* ✅ page + contact class */}
      <div className="page contact">

        <div className="card">
          <h2>All Contact Submissions</h2>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Inquiry</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Attachment</th>
                <th>Subscribed</th>
                <th>Submitted At</th>
              </tr>
            </thead>

            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan="9">No Data Found</td>
                </tr>
              ) : (
                contacts.map((c, i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone || "-"}</td>
                    <td>{c.inquiry || "-"}</td>
                    <td>{c.subject || "-"}</td>
                    <td>{c.message || "-"}</td>

                    <td>
                      {c.attachment ? (
                        <a
                          href={`http://localhost:5000/uploads/${c.attachment}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>{c.subscribe ? "Yes" : "No"}</td>
                    <td>{new Date(c.createdAt).toLocaleString()}</td>
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

export default AdminContact;