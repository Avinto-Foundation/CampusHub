# M2 - Event Registration

## What this feature should do

This page lists upcoming campus events, showing each event's title, date,
and how many students have registered out of its total capacity.

Each event has a Register button. Once an event has reached its capacity,
the button should turn into a disabled "Full" button so no more students
can register for it. An event is considered full as soon as the number
registered reaches its capacity — it does not need to go over.

Clicking Details on an event should pop up a short summary with the
event's title and the first part of its description.

An "Announcements" panel on the side loads independently and shows the
latest announcements about events. If it cannot load, it should say so
instead of showing a blank space or crashing the page.

At the bottom of the page is a registration form. The student chooses an
event, then fills in their name, email, roll number, t-shirt size, and an
emergency contact (a name and a phone number, collected as two separate
fields). If the registration cannot be saved, the page should tell the
student something went wrong, without showing any technical detail.

Below that is a small "Find an event by ID" form. Typing an event's id and
clicking "Find" should load just that one event from the API and show it as
"title on date", for example "Inter-College Basketball Finals on
2026-10-12". If no event has that id, it should say "No event found with
that ID." instead.

The API for this module is documented in Swagger at /api/docs/ under the
events section.
