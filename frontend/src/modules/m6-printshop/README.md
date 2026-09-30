# M6 - Print Shop

## What this feature should do

This page lists print jobs that have already been submitted, showing the
file name, number of pages, number of copies, whether it is color, and
its total cost.

Clicking Details on a job should pop up a short summary with the file
name and the first part of its description.

A "Price list" panel on the side loads independently and shows the price
per page for each print category. If it cannot load, it should say so
instead of showing a blank space or crashing the page.

At the bottom of the page is a form to submit a new print job: file
name, number of pages, number of copies, whether to print in color, and
the delivery hostel and room (as two separate fields). While filling in
the form, an estimated cost should update live: it is the number of
pages times the number of copies times the price per page (2 for
black-and-white, 10 for color). If the print job cannot be submitted,
the page should tell the student something went wrong, without showing
any technical detail.

Below that is a small "Check a print job by ID" form. Typing a job's id
and clicking "Check" should load just that one job from the API and show
its file name and total cost, for example "poster_design.pdf costs 30".
If no job has that id, it should say "No print job found with that ID."
instead.

The API for this module is documented in Swagger at /api/docs/ under the
print section.
