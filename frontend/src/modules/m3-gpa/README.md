# M3 - GPA Calculator

## What this feature should do

This page lists the courses a student can include in their GPA. Each
course shows its code, name, and number of credits, with a small input
next to it where the student can type a grade point between 0 and 4.

Only courses that have a grade point typed in should count toward the
GPA. Clicking "Calculate" should compute the GPA as the credit-weighted
average: each course's grade point is multiplied by its credits, those
are added up, and the total is divided by the total number of credits
entered. The result is shown rounded to two decimal places. If no course
has a grade entered, the GPA is 0.

Clicking Details on a course should pop up a short summary with the
course's name and the first part of its description.

A "Saved GPA records" panel on the side loads independently and shows
GPAs students have previously saved. If it cannot load, it should say so
instead of showing a blank space or crashing the page.

At the bottom of the page is a form where the student types their name
and saves their calculated GPA. If the GPA cannot be saved, the page
should tell the student something went wrong, without showing any
technical detail.

The API for this module is documented in Swagger at /api/docs/ under the
gpa section.
