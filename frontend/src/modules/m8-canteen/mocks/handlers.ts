// These handlers must match Swagger. If they don't, tests can pass while the
// real app is broken.
//
// Each handler is one fake API endpoint. The paths come from Swagger
// (/api/docs/, canteen section) and backend/config/urls.py, never from
// whatever URL the page happens to call.
import { http, HttpResponse } from "msw";

import { menuItems, orders } from "./data";

export const handlers = [
  // The menu list.
  http.get("/api/canteen/menu/", () => {
    return HttpResponse.json(menuItems);
  }),

  // One menu item by its id (the "Find a dish by ID" form). Like the real
  // API, it answers 404 Not Found when no menu item has that id.
  http.get("/api/canteen/menu/:id/", ({ params }) => {
    const item = menuItems.find((m) => m.id === Number(params.id));
    if (!item) {
      return HttpResponse.json({ detail: "No MenuItem matches the given query." }, { status: 404 });
    }
    return HttpResponse.json(item);
  }),

  // The "Recent orders" side panel.
  http.get("/api/canteen/orders/", () => {
    return HttpResponse.json(orders);
  }),

  // The checkout form. Like the real API, it answers 201 Created and sends
  // back the new order with an id added.
  http.post("/api/canteen/orders/", async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: 4, ...body }, { status: 201 });
  }),
];
