# M1 - Library Book Search

## What this feature should do

This page shows every book in the library catalogue. Each row shows the
book's title, author, and whether it is currently available.

There is a search box above the list. Typing in it should narrow the list
down to books whose title contains what was typed, so typing "hobbit"
shows "The Hobbit". Uppercase and lowercase letters don't matter.
Clearing the search box should bring back every book.

Clicking the "Details" button on a book should pop up a short summary with
the book's title and the first part of its description.

Below the main list there is a "Recent reservations" panel. It loads its
own list of the most recent reservations independently of the main book
list. If that panel cannot load its data, it should say so instead of
showing a blank space or crashing the page.

At the bottom of the page there is a form to reserve a book. The student
picks a book, fills in their name, email, roll number, and phone number,
chooses a loan period (7, 14, or 21 days) and a pickup location, and can
tick a box to get an email reminder before the due date. If the
reservation cannot be saved, the page should tell the student something
went wrong, without showing any technical detail.

Below that is a small "Find a book by ID" form. Typing a book's id and
clicking "Find" should load just that one book from the API and show it as
"title by author", for example "The Hobbit by J.R.R. Tolkien". If no book
has that id, it should say "No book found with that ID." instead.

The API for this module is documented in Swagger at /api/docs/ under the
library section.
