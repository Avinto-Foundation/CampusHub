// Fake data for the M5 tests, copied from backend/m5_bus/fixtures/seed.json.
//
// The shapes below are written from Swagger (/api/docs/, bus section),
// NOT imported from ../types.ts. That is on purpose: types.ts belongs to the
// app, and the app might be wrong. The mocks must always describe what the
// real API sends.

// GET /api/bus/routes/ returns a list of these.
export interface ApiRoute {
  id: number;
  route_name: string;
  departures: string[]; // times as text, like "07:00"
  description: string;
}

// GET /api/bus/announcements/ returns a list of these.
export interface ApiAnnouncement {
  id: number;
  message: string;
}

// POST /api/bus/reminders/ uses this shape.
export interface ApiReminder {
  id: number;
  route_id: number;
  departure: string;
  student_name: string;
  student_email: string;
  phone: string;
  minutes_before: number; // 5, 10, 15 or 30
  channel: string; // "email" or "sms"
  repeat_weekdays: boolean;
}

export const routes: ApiRoute[] = [
  {
    id: 1,
    route_name: "Main Gate - Hostel Block",
    departures: ["07:00", "08:30", "10:00", "12:30", "14:00", "16:00", "18:00"],
    description:
      "Runs between the main campus gate and the hostel blocks, stopping at the library.",
  },
  {
    id: 2,
    route_name: "Campus - City Center",
    departures: ["07:30", "09:15", "11:00", "13:00", "15:30", "17:45"],
    description:
      "Connects the campus to the city center bus stand, with a stop at the market.",
  },
  {
    id: 3,
    route_name: "Sports Complex Shuttle",
    departures: ["07:15", "08:00", "09:00", "13:15", "17:00"],
    description:
      "A short shuttle loop between the academic blocks and the sports complex.",
  },
];

export const announcements: ApiAnnouncement[] = [
  {
    id: 1,
    message:
      "The Sports Complex Shuttle will run on a reduced schedule during the exam week.",
  },
  {
    id: 2,
    message:
      "A new stop near the new academic block has been added to the City Center route.",
  },
];
