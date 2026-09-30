import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import EventLookup from "./EventLookup";
import "./styles.css";
import type { Announcement, Event, RegisterRequest } from "./types";
import { isEventFull } from "./utils";

function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  const [announcements, setAnnouncements] = useState<Announcement[] | null>(
    null,
  );
  const [announcementsError, setAnnouncementsError] = useState(false);

  const [selectedEventId, setSelectedEventId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [tshirtSize, setTshirtSize] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      const res = await fetch("/api/events/");
      const data = await res.json();
      setEvents(data);
    }
    loadEvents();
  }, []);

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const res = await fetch("/api/event/announcements/");
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

  function handleDetails(event: Event) {
    alert(`${event.title} — ${event.discription.slice(0, 120)}`);
  }

  async function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setFormError(false);
    setFormSuccess(false);

    const body: RegisterRequest = {
      name,
      email,
      roll_number: rollNumber,
      tshirt_size: tshirtSize,
      emergency_contact: `${contactName} (${contactPhone})`,
    };

    try {
      const res = await fetch(`/api/events/${selectedEventId}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("Failed to register");
      }
      setFormSuccess(true);
      setName("");
      setEmail("");
      setRollNumber("");
      setTshirtSize("");
      setContactName("");
      setContactPhone("");
    } catch {
      setFormError(true);
    }
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        &larr; Back to CampusHub
      </Link>
      <h1>Event Registration</h1>

      <div className="layout">
        <div className="main-list">
          {events.map((event) => {
            const full = isEventFull(event.registered_count, event.capacity);
            return (
              <div className="list-item" key={event.id}>
                <div>
                  <strong>{event.title}</strong> — {event.date} (
                  {event.registered_count}/{event.capacity})
                </div>
                <div className="list-item-actions">
                  <button onClick={() => handleDetails(event)}>Details</button>
                  <button
                    className="register-button"
                    disabled={full}
                    onClick={() => setSelectedEventId(String(event.id))}
                  >
                    {full ? "Full" : "Register"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="side-panel">
          <h2>Announcements</h2>
          {announcementsError && <p>Could not load announcements.</p>}
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

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register for an event</h2>
        <select
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          required
        >
          <option value="">Choose an event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Roll number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />
        <input
          placeholder="T-shirt size"
          value={tshirtSize}
          onChange={(e) => setTshirtSize(e.target.value)}
          required
        />
        <input
          placeholder="Emergency contact name"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          required
        />
        <input
          placeholder="Emergency contact phone"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {formError && (
          <p className="error">Something went wrong. Please try again.</p>
        )}
        {formSuccess && <p className="success">Registration submitted!</p>}
      </form>

      <EventLookup />
    </div>
  );
}

export default EventsPage;
