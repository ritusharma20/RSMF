import Navbar from "../components/Navbar";
import "../styles/layout.css";   // 👈 yaha likho
import Sidebar from "../components/Sidebar";
// import "../App.css";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div className="main">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;