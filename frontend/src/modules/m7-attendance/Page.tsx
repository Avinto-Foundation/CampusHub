import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import SubjectLookup from "./SubjectLookup";
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
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [leaveSubject, setLeaveSubject] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [date, setDate] = useState("");
  const [days, setDays] = useState("1");
  const [reason, setReason] = useState("");
  const [informedTeacher, setInformedTeacher] = useState(false);
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
      roll_number: rollNumber,
      email,
      subject: leaveSubject,
      leave_type: leaveType,
      leave_date: date,
      days: Number(days),
      reason,
      informed_teacher: informedTeacher,
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
      setRollNumber("");
      setEmail("");
      setLeaveSubject("");
      setLeaveType("");
      setDate("");
      setDays("1");
      setReason("");
      setInformedTeacher(false);
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
                  <strong>{subject.subject}</strong> — {percentage.toFixed(1)}%
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
          placeholder="Roll number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
          value={leaveSubject}
          onChange={(e) => setLeaveSubject(e.target.value)}
          required
        >
          <option value="">Choose a subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.subject}>
              {subject.subject}
            </option>
          ))}
        </select>
        <fieldset className="choice-group">
          <legend>Leave type</legend>
          {[
            { value: "medical", label: "Medical" },
            { value: "family", label: "Family" },
            { value: "event", label: "College event" },
            { value: "other", label: "Other" },
          ].map((option) => (
            <label key={option.value}>
              <input
                type="radio"
                name="leave-type"
                value={option.value}
                checked={leaveType === option.value}
                onChange={(e) => setLeaveType(e.target.value)}
                required
              />
              {option.label}
            </label>
          ))}
        </fieldset>
        <input
          placeholder="Leave date (YYYY-MM-DD)"
          inputMode="numeric"
          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          title="Use the format YYYY-MM-DD, for example 2026-10-02"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="number"
          min={1}
          max={10}
          placeholder="Number of days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          required
        />
        <textarea
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={informedTeacher}
            onChange={(e) => setInformedTeacher(e.target.checked)}
          />
          I have informed my class teacher
        </label>
        <button type="submit">Request leave</button>
        {formError && (
          <p className="error">Something went wrong. Please try again.</p>
        )}
        {formSuccess && <p className="success">Leave request submitted!</p>}
      </form>

      <SubjectLookup />
    </div>
  );
}

export default AttendancePage;
