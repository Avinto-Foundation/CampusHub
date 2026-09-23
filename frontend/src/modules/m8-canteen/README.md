# M8 - Canteen Order (Mentor Demo)

## What this feature should do

This page lists everything on the canteen menu with its name, category,
and price. Clicking "Add" adds an item to the cart; adding the same item
again should increase its quantity instead of creating a duplicate line.
The cart shows a running total, calculated by multiplying each item's
price by its quantity and adding those up.

Clicking Details on a menu item should pop up a short summary with the
item's name and the first part of its description.

A "Recent orders" panel on the side loads independently and shows orders
that have already been placed. If it cannot load, it should say so
instead of showing a blank space or crashing the page.

At the bottom of the page is a checkout form: name, phone, a pickup
time, optional notes, and the delivery hostel and room (as two separate
fields). Submitting it should place an order for everything currently in
the cart. If the order cannot be placed, the page should tell the
student something went wrong, without showing any technical detail.

The API for this module is documented in Swagger at /api/docs/ under the
canteen section.
