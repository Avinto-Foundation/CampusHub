// These handlers must match Swagger. If they don't, tests can pass while the
// real app is broken.
//
// Each handler is one fake API endpoint. The paths come from Swagger
// (/api/docs/, hostel section) and backend/config/urls.py, never from
// whatever URL the page happens to call.
import { http, HttpResponse } from "msw";

import { complaints, notices } from "./data";

export const handlers = [
  // The complaints list.
  http.get("/api/hostel/complaints/", () => {
    return HttpResponse.json(complaints);
  }),

  // One complaint by its id (the "Check a complaint by ID" form). Like the
  // real API, it answers 404 Not Found when no complaint has that id.
  http.get("/api/hostel/complaints/:id/", ({ params }) => {
    const complaint = complaints.find((c) => c.id === Number(params.id));
    if (!complaint) {
      return HttpResponse.json({ detail: "No Complaint matches the given query." }, { status: 404 });
    }
    return HttpResponse.json(complaint);
  }),

  // The "Hostel notices" side panel.
  http.get("/api/hostel/notices/", () => {
    return HttpResponse.json(notices);
  }),

  // The "File a complaint" form. Like the real API, it answers 201 Created and
  // sends back the new complaint with an id added.
  http.post("/api/hostel/complaints/", async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    // The server sets status itself (it is read-only), and every new
    // complaint starts as "Open".
    return HttpResponse.json(
      { id: 5, ...body, status: "Open" },
      { status: 201 },
    );
  }),
];
