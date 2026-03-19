import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import Dashboard from "./pages/Dashboard";
import Donations from "./pages/Donations";
import AdminTeam from "./pages/AdminTeam";
import AdminReports from "./pages/AdminReports";
import AdminStories from "./pages/AdminStories";
import Volunteers from "./pages/Volunteers"; // ✅ Import new page

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

                <Route path="/admin-volunteers" element={<Volunteers />} /> {/* ✅ New Route */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;