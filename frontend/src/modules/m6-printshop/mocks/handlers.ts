// These handlers must match Swagger. If they don't, tests can pass while the
// real app is broken.
//
// Each handler is one fake API endpoint. The paths come from Swagger
// (/api/docs/, print section) and backend/config/urls.py, never from
// whatever URL the page happens to call.
import { http, HttpResponse } from "msw";

import { priceList, printJobs } from "./data";

export const handlers = [
  // The list of print jobs.
  http.get("/api/print/jobs/", () => {
    return HttpResponse.json(printJobs);
  }),

  // One print job by its id (the "Check a print job by ID" form). Like the
  // real API, it answers 404 Not Found when no job has that id.
  http.get("/api/print/jobs/:id/", ({ params }) => {
    const job = printJobs.find((j) => j.id === Number(params.id));
    if (!job) {
      return HttpResponse.json({ detail: "No PrintJob matches the given query." }, { status: 404 });
    }
    return HttpResponse.json(job);
  }),

  // The "Price list" side panel.
  http.get("/api/print/prices/", () => {
    return HttpResponse.json(priceList);
  }),

  // The "Submit a print job" form. Like the real API, it answers 201 Created
  // and sends back the new job with an id added.
  http.post("/api/print/jobs/", async ({ request }) => {
    const body = (await request.json()) as {
      pages: number;
      copies: number;
      color: boolean;
    };
    // The real server works out the cost itself:
    // pages x copies x price per page (2 for black-and-white, 10 for color).
    // It also sends back an empty description.
    const cost = body.pages * body.copies * (body.color ? 10 : 2);
    return HttpResponse.json(
      { id: 4, ...body, cost, description: "" },
      { status: 201 },
    );
  }),
];
