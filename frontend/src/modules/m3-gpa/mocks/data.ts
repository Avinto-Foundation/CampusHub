// Fake data for the M3 tests, copied from backend/m3_gpa/fixtures/seed.json.
//
// The shapes below are written from Swagger (/api/docs/, gpa section),
// NOT imported from ../types.ts. That is on purpose: types.ts belongs to the
// app, and the app might be wrong. The mocks must always describe what the
// real API sends.

// GET /api/gpa/courses/ returns a list of these.
export interface ApiCourse {
  id: number;
  code: string;
  name: string;
  credits: number;
  description: string;
}

// GET and POST /api/gpa/records/ use this shape.
export interface ApiGpaRecord {
  id: number;
  student_name: string;
  gpa: string; // Django sends decimals as text, like "3.65"
}

export const courses: ApiCourse[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Programming",
    credits: 4,
    description: "Fundamentals of programming using variables, loops, and functions.",
  },
  {
    id: 2,
    code: "MA201",
    name: "Linear Algebra",
    credits: 3,
    description: "Vectors, matrices, and linear transformations with applications.",
  },
  {
    id: 3,
    code: "PH101",
    name: "Physics for Engineers",
    credits: 3,
    description: "Mechanics, waves, and thermodynamics for first-year engineering students.",
  },
  {
    id: 4,
    code: "HS110",
    name: "Communication Skills",
    credits: 1,
    description: "Written and spoken communication skills for academic and professional settings.",
  },
];

// Newest first, like the real API.
export const gpaRecords: ApiGpaRecord[] = [
  { id: 2, student_name: "Karan Mehta", gpa: "3.20" },
  { id: 1, student_name: "Priya Nair", gpa: "3.65" },
];
