# M7 - Attendance Tracker

## What this feature should do

This page lists each subject a student is taking, showing how many
classes they attended out of the total held so far, as a percentage. A
subject with no classes held yet should show 0%, not an error.

Next to the percentage is a badge that says whether the student is
"Eligible" or "Not eligible" for the exam in that subject. A student is
eligible once their attendance percentage is at least 75, using the
exact percentage with no rounding — a subject at 74.9% is not eligible,
only 75% and above counts.

Clicking Details on a subject should pop up a short summary with the
subject's name and the first part of its description.

A "My leave requests" panel on the side loads independently and shows
previously submitted leave requests. If it cannot load, it should say so
instead of showing a blank space or crashing the page.

At the bottom of the page is a form to request leave: name, roll number,
email, the subject the leave affects, the type of leave (medical,
family, college event, or other), the first day of leave typed as
YYYY-MM-DD, how many days, a reason, and a box to tick once the class
teacher has been told. If the leave request cannot be saved, the page
should tell the student something went wrong, without showing any
technical detail.

The API for this module is documented in Swagger at /api/docs/ under the
attendance section.
