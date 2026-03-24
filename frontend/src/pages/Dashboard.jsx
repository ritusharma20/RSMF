import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import "../styles/AdminDashboard.css";
import { FaUsers, FaFileAlt, FaCheckCircle } from "react-icons/fa";

const Dashboard = () => {

  // ✅ STATE
  const [counts, setCounts] = useState({
    volunteers: 0,
    reports: 0,
    approved: 0
  });

  // ✅ API CALL
  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard")
      .then(res => res.json())
      .then(data => {
        console.log("API DATA 👉", data); // debug
        setCounts(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Layout>
      <div className="admin-dashboard">
        <h2 className="admin-dashboard__title">Admin Dashboard </h2>

        <div className="admin-dashboard__cards">
          
          {/* Volunteers */}
          <div className="admin-dashboard__card">
            <div className="admin-dashboard__icon users">
              <FaUsers />
            </div>
            <div>
              <h3>{counts.volunteers}</h3>
              <p>Total Volunteers</p>
            </div>
          </div>

          {/* Reports */}
          <div className="admin-dashboard__card">
            <div className="admin-dashboard__icon reports">
              <FaFileAlt />
            </div>
            <div>
              <h3>{counts.reports}</h3>
              <p>Total Reports</p>
            </div>
          </div>

          {/* Approved */}
          <div className="admin-dashboard__card">
            <div className="admin-dashboard__icon approved">
              <FaCheckCircle />
            </div>
            <div>
              <h3>{counts.approved}</h3>
              <p>Approved Volunteers</p>
            </div>
          </div>

        </div>

        {/* Welcome Box */}
        <div className="admin-dashboard__welcome">
          <h3>Welcome Back </h3>
          <p>
            Manage your volunteers, reports and activities from this dashboard.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;