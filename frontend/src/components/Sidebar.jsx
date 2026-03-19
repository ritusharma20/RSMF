import { Link, useLocation } from "react-router-dom";
import "../styles/layout.css";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/donations", label: "Donations" },
    { path: "/admin-team", label: "Our Team" },
    { path: "/admin-reports", label: "Reports" },
    { path: "/admin-stories", label: "Stories" },
    { path: "/admin-volunteers", label: "Volunteers" }, // ✅ Added
    

        { path: "/admin/contact", label: "Contact" },

  ];

  return (
    <div className="sidebar">
      <h2>Admin</h2>
      <ul>
        {links.map((link) => (
          <li
            key={link.path}
            className={location.pathname === link.path ? "active" : ""}
          >
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;