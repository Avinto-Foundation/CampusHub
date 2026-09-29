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

At the bottom of the page is a form where a student can ask to be
reminded before a bus. They pick a route, then one of that route's
departure times (the departure list only fills in once a route is
chosen), and enter their name, email, and phone number. They choose how
early to be reminded (5, 10, 15, or 30 minutes before), whether the
reminder comes by email or SMS, and can tick a box to repeat it every
weekday. If the reminder cannot be saved, the page should tell the
student something went wrong, without showing any technical detail.

The API for this module is documented in Swagger at /api/docs/ under the
bus section.
