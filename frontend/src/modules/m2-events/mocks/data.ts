// Fake data for the M2 tests, copied from backend/m2_events/fixtures/seed.json.
//
// The shapes below are written from Swagger (/api/docs/, events section),
// NOT imported from ../types.ts. That is on purpose: types.ts belongs to the
// app, and the app might be wrong. The mocks must always describe what the
// real API sends.

// GET /api/events/ returns a list of these.
export interface ApiEvent {
  id: number;
  title: string;
  date: string; // Django sends dates as text, like "2026-10-05"
  capacity: number;
  registered_count: number;
  description: string;
}

// GET /api/events/announcements/ returns a list of these.
export interface ApiAnnouncement {
  id: number;
  message: string;
}

// POST /api/events/{id}/register/ uses this shape.
export interface ApiRegistration {
  id: number;
  name: string;
  email: string;
  roll_number: string;
  tshirt_size: string;
  emergency_contact: { name: string; phone: string };
}

// Soonest date first, like the real API.
export const events: ApiEvent[] = [
  {
    id: 1,
    title: "Annual Tech Fest",
    date: "2026-10-05",
    capacity: 50,
    registered_count: 50,
    description: "A full day of hackathons, robotics demos, and tech talks from alumni.",
  },
  {
    id: 2,
    title: "Inter-College Basketball Finals",
    date: "2026-10-12",
    capacity: 50,
    registered_count: 49,
    description: "The championship match between the top two teams of this year's league.",
  },
  {
    id: 3,
    title: "Freshers' Welcome Party",
    date: "2026-10-20",
    capacity: 200,
    registered_count: 12,
    description: "An evening of music, games, and food to welcome the first-year batch.",
  },
];

export const announcements: ApiAnnouncement[] = [
  {
    id: 1,
    message: "Tech Fest registrations are now full, a waitlist will open soon.",
  },
  {
    id: 2,
    message: "Basketball finals tickets must be collected from the sports office by Friday.",
  },
  {
    id: 3,
    message: "Freshers' Welcome Party volunteers should report an hour early.",
  },
];
