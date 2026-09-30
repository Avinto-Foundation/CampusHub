// Fake data for the M7 tests, copied from backend/m7_attendance/fixtures/seed.json.
//
// The shapes below are written from Swagger (/api/docs/, attendance section),
// NOT imported from ../types.ts. That is on purpose: types.ts belongs to the
// app, and the app might be wrong. The mocks must always describe what the
// real API sends.

// GET /api/attendance/subjects/ returns a list of these.
export interface ApiSubject {
  id: number;
  subject: string;
  attended: number;
  total: number;
  description: string;
}

// GET and POST /api/attendance/leave-requests/ use this shape.
export interface ApiLeaveRequest {
  id: number;
  name: string;
  roll_number: string;
  email: string;
  subject: string;
  leave_type: string; // one of "medical", "family", "event", "other"
  date: string; // Django sends dates as text, like "2026-10-02"
  days: number;
  reason: string;
  informed_teacher: boolean;
}

export const subjects: ApiSubject[] = [
  {
    id: 1,
    subject: "Data Structures",
    attended: 30,
    total: 40,
    description: "Core course covering arrays, linked lists, trees, and graphs.",
  },
  {
    id: 2,
    subject: "Digital Electronics",
    attended: 29,
    total: 40,
    description: "Logic gates, combinational and sequential circuits.",
  },
  {
    id: 3,
    subject: "Engineering Mathematics",
    attended: 44,
    total: 59,
    description: "Differential equations, linear algebra, and probability.",
  },
  {
    id: 4,
    subject: "Technical Elective",
    attended: 0,
    total: 0,
    description:
      "An elective course that has not started meeting yet this semester.",
  },
];

// Newest first, like the real API.
export const leaveRequests: ApiLeaveRequest[] = [
  {
    id: 2,
    name: "Arjun Reddy",
    roll_number: "EE22-018",
    email: "arjun.reddy@campus.edu",
    subject: "Digital Electronics",
    leave_type: "medical",
    date: "2026-10-08",
    days: 1,
    reason: "Medical appointment for a follow-up checkup.",
    informed_teacher: false,
  },
  {
    id: 1,
    name: "Neha Joshi",
    roll_number: "CS22-045",
    email: "neha.joshi@campus.edu",
    subject: "Data Structures",
    leave_type: "family",
    date: "2026-10-02",
    days: 2,
    reason: "Attending a family wedding out of town.",
    informed_teacher: true,
  },
];
