// Fake data for the M1 tests, copied from backend/m1_library/fixtures/seed.json.
//
// The shapes below are written from Swagger (/api/docs/, library section),
// NOT imported from ../types.ts. That is on purpose: types.ts belongs to the
// app, and the app might be wrong. The mocks must always describe what the
// real API sends.

// GET /api/library/books/ returns a list of these.
export interface ApiBook {
  id: number;
  title: string;
  author: string;
  available: boolean;
  description: string;
}

// GET and POST /api/library/reservations/ use this shape.
export interface ApiReservation {
  id: number;
  book_id: number;
  book_title: string; // filled in by the server from the book, read-only
  student_name: string;
  email: string;
  roll_number: string;
  phone: string;
  loan_days: number; // 7, 14 or 21
  pickup_location: string; // "main", "engineering" or "hostel"
  due_date_reminder: boolean;
}

export const books: ApiBook[] = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    available: true,
    description:
      "A boy discovers he is a wizard and starts his first year at Hogwarts School of Witchcraft and Wizardry.",
  },
  {
    id: 2,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    available: true,
    description:
      "A reluctant hobbit joins a group of dwarves on a quest to reclaim a mountain from a dragon.",
  },
  {
    id: 3,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    available: false,
    description: "A comprehensive textbook covering a broad range of algorithms in depth.",
  },
  {
    id: 4,
    title: "Clean Code",
    author: "Robert C. Martin",
    available: true,
    description: "A handbook of agile software craftsmanship focused on writing readable code.",
  },
  {
    id: 5,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    available: true,
    description: "An accessible overview of cosmology, from the Big Bang to black holes.",
  },
  {
    id: 6,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    available: false,
    description: "A witty look at manners, marriage, and money in early 19th century England.",
  },
  {
    id: 7,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    available: true,
    description: "Practical tips for becoming a more effective and adaptable software developer.",
  },
  {
    id: 8,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    available: true,
    description: "A wide-ranging look at how Homo sapiens came to dominate the world.",
  },
];

// Newest first, like the real API.
export const reservations: ApiReservation[] = [
  {
    id: 3,
    book_id: 6,
    book_title: "Pride and Prejudice",
    student_name: "Meera Iyer",
    email: "meera.iyer@campus.edu",
    roll_number: "HS23-007",
    phone: "9876500033",
    loan_days: 21,
    pickup_location: "hostel",
    due_date_reminder: true,
  },
  {
    id: 2,
    book_id: 3,
    book_title: "Introduction to Algorithms",
    student_name: "Rahul Verma",
    email: "rahul.verma@campus.edu",
    roll_number: "EE22-031",
    phone: "9876500022",
    loan_days: 7,
    pickup_location: "engineering",
    due_date_reminder: false,
  },
  {
    id: 1,
    book_id: 1,
    book_title: "Harry Potter and the Philosopher's Stone",
    student_name: "Aditi Sharma",
    email: "aditi.sharma@campus.edu",
    roll_number: "CS21-014",
    phone: "9876500011",
    loan_days: 14,
    pickup_location: "main",
    due_date_reminder: true,
  },
];
