import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import ComplaintLookup from "./ComplaintLookup";
import "./styles.css";
import type { Complaint, ComplaintRequest, Notice } from "./types";
import { validateComplaint } from "./utils";

function HostelPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const [notices, setNotices] = useState<Notice[] | null>(null);
  const [noticesError, setNoticesError] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [block, setBlock] = useState("");
  const [room, setRoom] = useState("");
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    async function loadComplaints() {
      const res = await fetch("/api/hostel/complaints/");
      const data = await res.json();
      setComplaints(data);
    }
    loadComplaints();
  }, []);

  useEffect(() => {
    async function loadNotices() {
      try {
        const res = await fetch("/api/hostel/notice/");
        if (!res.ok) {
          throw new Error("Failed to load notices");
        }
        const data = await res.json();
        setNotices(data);
      } catch {
        setNoticesError(true);
      }
    }
    loadNotices();
  }, []);

  function handleDetails(complaint: Complaint) {
    alert(`${complaint.category} — ${complaint.descrption.slice(0, 120)}`);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(false);
    setFormSuccess(false);

    const errors = validateComplaint({ room, description });
    setFieldErrors(errors);
    if (errors.length > 0) {
      return;
    }

    const body: ComplaintRequest = {
      name,
      category,
      description,
      location: `${block}-${room}`,
    };

    try {
      const res = await fetch("/api/hostel/complaints/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("Failed to submit complaint");
      }
      setFormSuccess(true);
      setName("");
      setCategory("");
      setDescription("");
      setBlock("");
      setRoom("");
    } catch {
      setFormError(true);
    }
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        &larr; Back to CampusHub
      </Link>
      <h1>Hostel Complaint</h1>

      <div className="layout">
        <div className="main-list">
          {complaints.map((complaint) => (
            <div className="list-item" key={complaint.id}>
              <div>
                <strong>{complaint.category}</strong> — Block{" "}
                {complaint.location.block}, Room {complaint.location.room}
                <span className="status-badge">{complaint.status}</span>
              </div>
              <button onClick={() => handleDetails(complaint)}>Details</button>
            </div>
          ))}
        </div>

        <div className="side-panel">
          <h2>Hostel notices</h2>
          {noticesError && <p>Could not load hostel notices.</p>}
          {!noticesError && notices === null && <p>Loading...</p>}
          {!noticesError && notices !== null && (
            <ul>
              {notices.map((notice) => (
                <li key={notice.id}>{notice.message}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <form className="complaint-form" onSubmit={handleSubmit}>
        <h2>File a complaint</h2>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Category (e.g. Plumbing)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <textarea
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Block"
          value={block}
          onChange={(e) => setBlock(e.target.value)}
          required
        />
        <input
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        {fieldErrors.length > 0 && (
          <ul className="field-errors">
            {fieldErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <button className="submit-button" type="submit">
          Submit complaint
        </button>
        {formError && (
          <p className="error">Something went wrong. Please try again.</p>
        )}
        {formSuccess && <p className="success">Complaint submitted!</p>}
      </form>

      <ComplaintLookup />
    </div>
  );
}

export default HostelPage;
