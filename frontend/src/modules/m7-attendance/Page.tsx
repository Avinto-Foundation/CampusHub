import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import type { LeaveRequest, LeaveRequestBody, Subject } from "./types";
import { isEligibleForExam } from "./utils";

function getPercentage(attended: number, total: number): number {
  if (total === 0) {
    return 0;
  }
  return (attended / total) * 100;
}

function AttendancePage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[] | null>(
    null,
  );
  const [leaveRequestsError, setLeaveRequestsError] = useState(false);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    async function loadSubjects() {
      const res = await fetch("/api/attendance/subjects/");
      const data = await res.json();
      setSubjects(data);
    }
    loadSubjects();
  }, []);

  useEffect(() => {
    async function loadLeaveRequests() {
      try {
        const res = await fetch("/api/attendence/leave-requests/");
        if (!res.ok) {
          throw new Error("Failed to load leave requests");
        }
        const data = await res.json();
        setLeaveRequests(data);
      } catch {
        setLeaveRequestsError(true);
      }
    }
    loadLeaveRequests();
  }, []);

  function handleDetails(subject: Subject) {
    alert(`${subject.subject} — ${subject.desription.slice(0, 120)}`);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(false);
    setFormSuccess(false);

    const body: LeaveRequestBody = {
      name,
      leave_date: date,
      reason,
    };

    try {
      const res = await fetch("/api/attendance/leave-requests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("Failed to submit leave request");
      }
      setFormSuccess(true);
      setName("");
      setDate("");
      setReason("");
    } catch {
      setFormError(true);
    }
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        &larr; Back to CampusHub
      </Link>
      <h1>Attendance Tracker</h1>

      <div className="layout">
        <div className="main-list">
          {subjects.map((subject) => {
            const percentage = getPercentage(subject.attended, subject.total);
            const eligible = isEligibleForExam(subject.attended, subject.total);
            return (
              <div className="list-item" key={subject.id}>
                <div>
                  <strong>{subject.subject}</strong> — {percentage.toFixed(0)}%
                  <span className="eligibility-badge">
                    {eligible ? "Eligible" : "Not eligible"}
                  </span>
                </div>
                <button onClick={() => handleDetails(subject)}>Details</button>
              </div>
            );
          })}
        </div>

        <div className="side-panel">
          <h2>My leave requests</h2>
          {leaveRequestsError && <p>Could not load my leave requests.</p>}
          {!leaveRequestsError && leaveRequests === null && <p>Loading...</p>}
          {!leaveRequestsError && leaveRequests !== null && (
            <ul>
              {leaveRequests.map((request) => (
                <li key={request.id}>
                  {request.date}: {request.reason}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <form className="leave-form" onSubmit={handleSubmit}>
        <h2>Request leave</h2>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <button type="submit">Request leave</button>
        {formError && (
          <p className="error">Something went wrong. Please try again.</p>
        )}
        {formSuccess && <p className="success">Leave request submitted!</p>}
      </form>
    </div>
  );
}

export default AttendancePage;
