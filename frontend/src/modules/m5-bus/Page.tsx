import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import type { Announcement, ReminderRequest, Route } from "./types";
import { getNextBus } from "./utils";

function getCurrentTime(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function BusPage() {
  const [routes, setRoutes] = useState<Route[]>([]);

  const [announcements, setAnnouncements] = useState<Announcement[] | null>(
    null,
  );
  const [announcementsError, setAnnouncementsError] = useState(false);

  const [routeId, setRouteId] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    async function loadRoutes() {
      const res = await fetch("/api/bus/routes/");
      const data = await res.json();
      setRoutes(data);
    }
    loadRoutes();
  }, []);

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const res = await fetch("/api/bus/anouncements/");
        if (!res.ok) {
          throw new Error("Failed to load announcements");
        }
        const data = await res.json();
        setAnnouncements(data);
      } catch {
        setAnnouncementsError(true);
      }
    }
    loadAnnouncements();
  }, []);

  function handleDetails(route: Route) {
    alert(`${route.route_name} — ${route.descriptoin.slice(0, 120)}`);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(false);
    setFormSuccess(false);

    const body: ReminderRequest = {
      route_id: Number(routeId),
      email: studentEmail,
    };

    try {
      const res = await fetch("/api/bus/reminders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("Failed to save reminder");
      }
      setFormSuccess(true);
      setStudentEmail("");
    } catch {
      setFormError(true);
    }
  }

  const now = getCurrentTime();

  return (
    <div className="page">
      <Link to="/" className="back-link">
        &larr; Back to CampusHub
      </Link>
      <h1>Campus Bus Timetable</h1>

      <div className="layout">
        <div className="main-list">
          {routes.map((route) => {
            const nextBus = getNextBus(route.departures, now);
            return (
              <div className="list-item" key={route.id}>
                <div className="list-item-top">
                  <div>
                    <strong>{route.route_name}</strong>
                    <div>{route.departures.join(", ")}</div>
                  </div>
                  <button onClick={() => handleDetails(route)}>Details</button>
                </div>
                <div className="next-bus-banner">
                  {nextBus ? `Next bus: ${nextBus}` : "No more buses today"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="side-panel">
          <h2>Bus announcements</h2>
          {announcementsError && <p>Could not load bus announcements.</p>}
          {!announcementsError && announcements === null && <p>Loading...</p>}
          {!announcementsError && announcements !== null && (
            <ul>
              {announcements.map((announcement) => (
                <li key={announcement.id}>{announcement.message}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <form className="reminder-form" onSubmit={handleSubmit}>
        <h2>Remind me before my bus</h2>
        <select
          value={routeId}
          onChange={(e) => setRouteId(e.target.value)}
          required
        >
          <option value="">Choose a route</option>
          {routes.map((route) => (
            <option key={route.id} value={route.id}>
              {route.route_name}
            </option>
          ))}
        </select>
        <input
          type="email"
          placeholder="Your email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          required
        />
        <button type="submit">Remind me</button>
        {formError && (
          <p className="error">Something went wrong. Please try again.</p>
        )}
        {formSuccess && <p className="success">Reminder set!</p>}
      </form>
    </div>
  );
}

export default BusPage;
