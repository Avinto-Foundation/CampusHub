// These handlers must match Swagger. If they don't, tests can pass while the
// real app is broken.
//
// Each handler is one fake API endpoint. The paths come from Swagger
// (/api/docs/, gpa section) and backend/config/urls.py, never from
// whatever URL the page happens to call.
import { http, HttpResponse } from "msw";

import { courses, gpaRecords } from "./data";

export const handlers = [
  // The course list.
  http.get("/api/gpa/courses/", () => {
    return HttpResponse.json(courses);
  }),

  // One course by its id (the "Find a course by ID" form). Like the real API,
  // it answers 404 Not Found when no course has that id.
  http.get("/api/gpa/courses/:id/", ({ params }) => {
    const course = courses.find((c) => c.id === Number(params.id));
    if (!course) {
      return HttpResponse.json({ detail: "No Course matches the given query." }, { status: 404 });
    }
    return HttpResponse.json(course);
  }),

  // The "Saved GPA records" side panel.
  http.get("/api/gpa/records/", () => {
    return HttpResponse.json(gpaRecords);
  }),

  // The "Save your GPA" form. Like the real API, it answers 201 Created and
  // sends back the new record with an id added.
  http.post("/api/gpa/records/", async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: 3, ...body }, { status: 201 });
  }),
];
