# M5 - Campus Bus Timetable

## What this feature should do

This page lists the campus bus routes along with their full list of
departure times for the day. Each route also shows a "Next bus" banner
that tells the student the next departure based on the current time. A
bus that is leaving exactly right now counts as already missed, so the
banner should show the next one after it. If there are no more
departures left today, the banner should say so instead of showing a
time.

Clicking Details on a route should pop up a short summary with the
route's name and the first part of its description.

A "Bus announcements" panel on the side loads independently and shows
announcements about the bus service. If it cannot load, it should say so
instead of showing a blank space or crashing the page.

At the bottom of the page is a form where a student can pick a route and
enter their email to be reminded before the next bus. If the reminder
cannot be saved, the page should tell the student something went wrong,
without showing any technical detail.

The API for this module is documented in Swagger at /api/docs/ under the
bus section.
