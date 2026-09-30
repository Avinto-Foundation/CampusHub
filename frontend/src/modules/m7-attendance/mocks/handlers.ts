// These handlers must match Swagger. If they don't, tests can pass while the
// real app is broken.
//
// Each handler is one fake API endpoint. The paths come from Swagger
// (/api/docs/, attendance section) and backend/config/urls.py, never from
// whatever URL the page happens to call.
import { http, HttpResponse } from "msw";

import { leaveRequests, subjects } from "./data";

export const handlers = [
  // The subject list.
  http.get("/api/attendance/subjects/", () => {
    return HttpResponse.json(subjects);
  }),

  // One subject by its id (the "Find a subject by ID" form). Like the real
  // API, it answers 404 Not Found when no subject has that id.
  http.get("/api/attendance/subjects/:id/", ({ params }) => {
    const subject = subjects.find((s) => s.id === Number(params.id));
    if (!subject) {
      return HttpResponse.json({ detail: "No Subject matches the given query." }, { status: 404 });
    }
    return HttpResponse.json(subject);
  }),

  // The "My leave requests" side panel.
  http.get("/api/attendance/leave-requests/", () => {
    return HttpResponse.json(leaveRequests);
  }),

  // The "Request leave" form. Like the real API, it answers 201 Created and
  // sends back the new leave request with an id added.
  http.post("/api/attendance/leave-requests/", async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: 3, ...body }, { status: 201 });
  }),
];
