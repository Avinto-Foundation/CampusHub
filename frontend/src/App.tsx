import { Link, Route, Routes } from "react-router-dom";

import "./App.css";
import LibraryPage from "./modules/m1-library/Page";
import EventsPage from "./modules/m2-events/Page";
import GpaPage from "./modules/m3-gpa/Page";
import HostelPage from "./modules/m4-hostel/Page";
import BusPage from "./modules/m5-bus/Page";
import PrintPage from "./modules/m6-printshop/Page";
import AttendancePage from "./modules/m7-attendance/Page";
import CanteenPage from "./modules/m8-canteen/Page";

const MODULES = [
  { path: "/m1", label: "M1 - Library Book Search" },
  { path: "/m2", label: "M2 - Event Registration" },
  { path: "/m3", label: "M3 - GPA Calculator" },
  { path: "/m4", label: "M4 - Hostel Complaint" },
  { path: "/m5", label: "M5 - Campus Bus Timetable" },
  { path: "/m6", label: "M6 - Print Shop" },
  { path: "/m7", label: "M7 - Attendance Tracker" },
  { path: "/m8", label: "M8 - Canteen Order" },
];

function HomePage() {
  return (
    <div className="home">
      <h1>CampusHub</h1>
      <p>
        Eight small campus features, each with a few bugs for you to find and
        fix. Pick a module below to get started.
      </p>
      <ul className="module-list">
        {MODULES.map((mod) => (
          <li key={mod.path}>
            <Link to={mod.path}>{mod.label}</Link>
          </li>
        ))}
      </ul>
      <a
        className="swagger-link"
        href="http://localhost:8000/api/docs/"
        target="_blank"
        rel="noreferrer"
      >
        Open API docs (Swagger) &rarr;
      </a>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/m1" element={<LibraryPage />} />
      <Route path="/m2" element={<EventsPage />} />
      <Route path="/m3" element={<GpaPage />} />
      <Route path="/m4" element={<HostelPage />} />
      <Route path="/m5" element={<BusPage />} />
      <Route path="/m6" element={<PrintPage />} />
      <Route path="/m7" element={<AttendancePage />} />
      <Route path="/m8" element={<CanteenPage />} />
    </Routes>
  );
}

export default App;
