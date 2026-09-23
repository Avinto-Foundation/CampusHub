# M4 - Hostel Complaint

## What this feature should do

This page lists hostel complaints that have been filed, showing each
complaint's category, its block and room, and its current status.

Clicking Details on a complaint should pop up a short summary with the
complaint's category and the first part of its description.

A "Hostel notices" panel on the side loads independently and shows
notices posted by the hostel administration. If it cannot load, it
should say so instead of showing a blank space or crashing the page.

At the bottom of the page is a form to file a new complaint: name,
category, a description of the issue, and the block and room (as two
separate fields). Before the complaint is sent, the room must be filled
in and the description must contain real text — spaces alone should not
count as a description. Any such problems should be listed under the
form before anything is sent to the server. If the complaint cannot be
saved for another reason, the page should tell the student something
went wrong, without showing any technical detail.

The API for this module is documented in Swagger at /api/docs/ under the
hostel section.
