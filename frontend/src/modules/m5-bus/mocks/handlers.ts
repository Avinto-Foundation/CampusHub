// These handlers must match Swagger. If they don't, tests can pass while the
// real app is broken.
//
// Each handler is one fake API endpoint. The paths come from Swagger
// (/api/docs/, bus section) and backend/config/urls.py, never from
// whatever URL the page happens to call.
import { http, HttpResponse } from "msw";

import { announcements, routes } from "./data";

export const handlers = [
  // The bus routes list (and the route choices in the reminder form).
  http.get("/api/bus/routes/", () => {
    return HttpResponse.json(routes);
  }),

  // One route by its id (the "Find a route by ID" form). Like the real API,
  // it answers 404 Not Found when no route has that id.
  http.get("/api/bus/routes/:id/", ({ params }) => {
    const route = routes.find((r) => r.id === Number(params.id));
    if (!route) {
      return HttpResponse.json({ detail: "No Route matches the given query." }, { status: 404 });
    }
    return HttpResponse.json(route);
  }),

  // The "Bus announcements" side panel.
  http.get("/api/bus/announcements/", () => {
    return HttpResponse.json(announcements);
  }),

  // The "Remind me before my bus" form. Like the real API, it answers
  // 201 Created and sends back the new reminder with an id added.
  http.post("/api/bus/reminders/", async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: 1, ...body }, { status: 201 });
  }),
];
