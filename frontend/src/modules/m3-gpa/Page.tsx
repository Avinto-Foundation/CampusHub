import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import type { Course, GpaRecord, SaveGpaRequest } from "./types";
import { calculateGPA } from "./utils";

function GpaPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [grades, setGrades] = useState<Record<number, string>>({});
  const [calculatedGpa, setCalculatedGpa] = useState<number | null>(null);

  const [records, setRecords] = useState<GpaRecord[] | null>(null);
  const [recordsError, setRecordsError] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    async function loadCourses() {
      const res = await fetch("/api/gpa/courses/");
      const data = await res.json();
      setCourses(data);
    }
    loadCourses();
  }, []);

  useEffect(() => {
    async function loadRecords() {
      try {
        const res = await fetch("/api/gpa/record/");
        if (!res.ok) {
          throw new Error("Failed to load records");
        }
        const data = await res.json();
        setRecords(data);
      } catch {
        setRecordsError(true);
      }
    }
    loadRecords();
  }, []);

  function handleDetails(course: Course) {
    alert(`${course.name} — ${course.descripton.slice(0, 120)}`);
  }

  function handleGradeChange(courseId: number, value: string) {
    setGrades((prev) => ({ ...prev, [courseId]: value }));
  }

  const enteredCourses = courses
    .filter((course) => grades[course.id] !== undefined && grades[course.id] !== "")
    .map((course) => ({
      gradePoint: Number(grades[course.id]),
      credits: course.credits,
    }));

  function handleCalculate() {
    setCalculatedGpa(calculateGPA(enteredCourses));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(false);
    setFormSuccess(false);

    const body: SaveGpaRequest = {
      name: studentName,
      gpa: calculatedGpa ?? 0,
    };

    try {
      const res = await fetch("/api/gpa/records/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("Failed to save GPA");
      }
      setFormSuccess(true);
      setStudentName("");
    } catch {
      setFormError(true);
    }
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        &larr; Back to CampusHub
      </Link>
      <h1>GPA Calculator</h1>

      <div className="layout">
        <div className="main-list">
          {courses.map((course) => (
            <div className="list-item" key={course.id}>
              <div>
                <strong>{course.code}</strong> {course.name} ({course.credits}{" "}
                credits)
              </div>
              <input
                className="grade-input"
                type="number"
                min={0}
                max={4}
                step={0.1}
                placeholder="0-4"
                value={grades[course.id] ?? ""}
                onChange={(e) => handleGradeChange(course.id, e.target.value)}
              />
              <button onClick={() => handleDetails(course)}>Details</button>
            </div>
          ))}

          <button
            className="calculate-button"
            type="button"
            onClick={handleCalculate}
          >
            Calculate
          </button>
          {calculatedGpa !== null && (
            <p className="gpa-result">GPA: {calculatedGpa.toFixed(2)}</p>
          )}
        </div>

        <div className="side-panel">
          <h2>Saved GPA records</h2>
          {recordsError && <p>Could not load saved GPA records.</p>}
          {!recordsError && records === null && <p>Loading...</p>}
          {!recordsError && records !== null && (
            <ul>
              {records.map((record) => (
                <li key={record.id}>
                  {record.student_name}: {record.gpa}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <form className="save-form" onSubmit={handleSubmit}>
        <h2>Save your GPA</h2>
        <input
          placeholder="Your name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        <button type="submit">Save</button>
        {formError && (
          <p className="error">Something went wrong. Please try again.</p>
        )}
        {formSuccess && <p className="success">GPA saved!</p>}
      </form>
    </div>
  );
}

export default GpaPage;
