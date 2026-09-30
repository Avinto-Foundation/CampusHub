// These handlers must match Swagger. If they don't, tests can pass while the
// real app is broken.
//
// Each handler is one fake API endpoint. The paths come from Swagger
// (/api/docs/, library section) and backend/config/urls.py, never from
// whatever URL the page happens to call.
import { http, HttpResponse } from "msw";

import { books, reservations } from "./data";

export const handlers = [
  // The book list (and the book dropdown in the reserve form).
  http.get("/api/library/books/", () => {
    return HttpResponse.json(books);
  }),

  // One book by its id (the "Find a book by ID" form). Like the real API, it
  // answers 404 Not Found when no book has that id.
  http.get("/api/library/books/:id/", ({ params }) => {
    const book = books.find((b) => b.id === Number(params.id));
    if (!book) {
      return HttpResponse.json({ detail: "No Book matches the given query." }, { status: 404 });
    }
    return HttpResponse.json(book);
  }),

  // The "Recent reservations" side panel.
  http.get("/api/library/reservations/", () => {
    return HttpResponse.json(reservations);
  }),

  // The reserve form. Like the real API, it answers 201 Created and sends
  // back the new reservation with an id added. The real server also fills in
  // book_title from the chosen book, so we do the same here.
  http.post("/api/library/reservations/", async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const book = books.find((b) => b.id === body.book_id);
    return HttpResponse.json(
      { id: 4, ...body, book_title: book ? book.title : "" },
      { status: 201 },
    );
  }),
];
