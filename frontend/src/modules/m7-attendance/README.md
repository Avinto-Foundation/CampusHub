# M7 - Attendance Tracker

## What this feature should do

This page lists each subject a student is taking, showing how many
classes they attended out of the total held so far, as a percentage. A
subject with no classes held yet should show 0%, not an error.

Next to the percentage is a badge that says whether the student is
"Eligible" or "Not eligible" for the exam in that subject. A student is
eligible when their attendance is 75% or more. A subject at 72.5% is not
eligible, and a subject at exactly 75% is.

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

Below that is a small "Find a subject by ID" form. Typing a subject's id
and clicking "Find" should load just that one subject from the API and
show it as "subject: attended of total classes attended", for example
"Digital Electronics: 29 of 40 classes attended". If no subject has that
id, it should say "No subject found with that ID." instead.

The API for this module is documented in Swagger at /api/docs/ under the
attendance section.
