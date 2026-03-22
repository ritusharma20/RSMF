import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
// PAGES
import Dashboard from "./pages/Dashboard";
import Donations from "./pages/Donations";
import AdminTeam from "./pages/AdminTeam";
import AdminReports from "./pages/AdminReports";
import AdminStories from "./pages/AdminStories";
import Volunteers from "./pages/Volunteers"; // ✅ Import new page
import AdminContact from "./pages/AdminContact";
import AdminGallery from "./pages/AdminGallery";
import AdminBlog from "./pages/AdminBlog";

import AdminNews from "./pages/AdminNews";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Donor */}
        <Route path="/donations" element={<Donations />} />

        {/* Team */}
        <Route path="/admin-team" element={<AdminTeam />} />

        {/* Reports */}
        <Route path="/admin-reports" element={<AdminReports />} />

        {/* Stories */}
        <Route path="/admin-stories" element={<AdminStories />} />
<Route path="/admin-gallery" element={<AdminGallery />} />

                <Route path="/admin-volunteers" element={<Volunteers />} /> {/* ✅ New Route */}
                <Route path="/admin/contact" element={<AdminContact />} />

<Route path="/admin/blogs" element={<AdminBlog />} />
<Route path="/admin-news" element={<AdminNews />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;