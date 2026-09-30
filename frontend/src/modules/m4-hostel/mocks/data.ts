// Fake data for the M4 tests, copied from backend/m4_hostel/fixtures/seed.json.
//
// The shapes below are written from Swagger (/api/docs/, hostel section),
// NOT imported from ../types.ts. That is on purpose: types.ts belongs to the
// app, and the app might be wrong. The mocks must always describe what the
// real API sends.

// GET and POST /api/hostel/complaints/ use this shape.
export interface ApiComplaint {
  id: number;
  name: string;
  category: string;
  description: string;
  status: string; // set by the server, starts as "Open"
  location: { block: string; room: string };
}

// GET /api/hostel/notices/ returns a list of these.
export interface ApiNotice {
  id: number;
  message: string;
}

// Newest first, like the real API.
export const complaints: ApiComplaint[] = [
  {
    id: 4,
    name: "Divya Menon",
    category: "Cleaning",
    description: "The common washroom on this floor has not been cleaned this week.",
    status: "Open",
    location: { block: "C", room: "108" },
  },
  {
    id: 3,
    name: "Vikram Singh",
    category: "Furniture",
    description: "One leg of the study table is broken and it wobbles badly.",
    status: "Resolved",
    location: { block: "A", room: "310" },
  },
  {
    id: 2,
    name: "Sneha Kulkarni",
    category: "Electrical",
    description: "The ceiling fan makes a loud grinding noise when switched on.",
    status: "In Progress",
    location: { block: "B", room: "112" },
  },
  {
    id: 1,
    name: "Ankit Rao",
    category: "Plumbing",
    description: "The bathroom tap has been leaking continuously for three days.",
    status: "Open",
    location: { block: "A", room: "204" },
  },
];

export const notices: ApiNotice[] = [
  {
    id: 1,
    message: "Water supply will be shut off between 2 PM and 4 PM on Friday for tank cleaning.",
  },
  {
    id: 2,
    message: "All residents must submit the annual room inspection form by next Monday.",
  },
  {
    id: 3,
    message: "The hostel gate closes at 10 PM sharp starting this week.",
  },
];
