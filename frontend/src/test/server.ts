// The fake API used by every test.
//
// MSW ("Mock Service Worker") catches the page's fetch() calls and answers
// them with the handlers below, so tests don't need the Django backend.
// Each module keeps its own handlers in src/modules/<module>/mocks/handlers.ts.
import { setupServer } from "msw/node";

import { handlers as libraryHandlers } from "../modules/m1-library/mocks/handlers";
import { handlers as eventsHandlers } from "../modules/m2-events/mocks/handlers";
import { handlers as gpaHandlers } from "../modules/m3-gpa/mocks/handlers";
import { handlers as hostelHandlers } from "../modules/m4-hostel/mocks/handlers";
import { handlers as busHandlers } from "../modules/m5-bus/mocks/handlers";
import { handlers as printshopHandlers } from "../modules/m6-printshop/mocks/handlers";
import { handlers as attendanceHandlers } from "../modules/m7-attendance/mocks/handlers";
import { handlers as canteenHandlers } from "../modules/m8-canteen/mocks/handlers";

export const server = setupServer(
  ...libraryHandlers,
  ...eventsHandlers,
  ...gpaHandlers,
  ...hostelHandlers,
  ...busHandlers,
  ...printshopHandlers,
  ...attendanceHandlers,
  ...canteenHandlers,
);
