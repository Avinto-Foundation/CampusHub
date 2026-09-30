// These handlers must match Swagger. If they don't, tests can pass while the
// real app is broken.
//
// Each handler is one fake API endpoint. The paths come from Swagger
// (/api/docs/, events section) and backend/config/urls.py, never from
// whatever URL the page happens to call.
import { http, HttpResponse } from "msw";

import { announcements, events } from "./data";

export const handlers = [
  // The events list.
  http.get("/api/events/", () => {
    return HttpResponse.json(events);
  }),

  // The "Announcements" side panel.
  http.get("/api/events/announcements/", () => {
    return HttpResponse.json(announcements);
  }),

  // One event by its id (the "Find an event by ID" form). Like the real API,
  // it answers 404 Not Found when no event has that id. It must come AFTER
  // the announcements handler: "/api/events/:id/" would also match
  // "/api/events/announcements/", and MSW uses the first handler that fits.
  http.get("/api/events/:id/", ({ params }) => {
    const event = events.find((e) => e.id === Number(params.id));
    if (!event) {
      return HttpResponse.json({ detail: "No Event matches the given query." }, { status: 404 });
    }
    return HttpResponse.json(event);
  }),

  // The registration form. Like the real API, it answers 201 Created and
  // sends back the new registration with an id added. (The event id is in
  // the URL, so it is not part of the body.)
  http.post("/api/events/:id/register/", async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: 1, ...body }, { status: 201 });
  }),
];
