// Fake data for the M6 tests, copied from backend/m6_printshop/fixtures/seed.json.
//
// The shapes below are written from Swagger (/api/docs/, print section),
// NOT imported from ../types.ts. That is on purpose: types.ts belongs to the
// app, and the app might be wrong. The mocks must always describe what the
// real API sends.

// GET and POST /api/print/jobs/ use this shape.
export interface ApiPrintJob {
  id: number;
  file_name: string;
  pages: number;
  copies: number;
  color: boolean;
  cost: number; // worked out by the server, you don't send it
  description: string; // read-only, you don't send it
  delivery_address: { hostel: string; room: string };
}

// GET /api/print/prices/ returns a list of these.
export interface ApiPriceListEntry {
  id: number;
  category: string;
  price_per_page: number;
}

// Newest first, like the real API.
export const printJobs: ApiPrintJob[] = [
  {
    id: 3,
    file_name: "lecture_notes.pdf",
    pages: 40,
    copies: 1,
    color: false,
    cost: 80,
    description: "Semester notes for the data structures course.",
    delivery_address: { hostel: "B", room: "112" },
  },
  {
    id: 2,
    file_name: "poster_design.pdf",
    pages: 1,
    copies: 3,
    color: true,
    cost: 30,
    description: "A3 poster for the department's annual exhibition.",
    delivery_address: { hostel: "C", room: "108" },
  },
  {
    id: 1,
    file_name: "assignment_report.pdf",
    pages: 12,
    copies: 2,
    color: false,
    cost: 48,
    description: "Final year project report, black and white, spiral bound.",
    delivery_address: { hostel: "A", room: "204" },
  },
];

export const priceList: ApiPriceListEntry[] = [
  { id: 1, category: "Black & White", price_per_page: 2 },
  { id: 2, category: "Color", price_per_page: 10 },
];
