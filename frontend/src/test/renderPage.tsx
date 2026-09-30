import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

// Renders a module page the way the app does, ready for a test.
//
// - Pages use <Link>, which only works inside a router, so we wrap the page
//   in MemoryRouter (a router that doesn't need a real browser address bar).
// - `user` is how tests click and type, like a real student would:
//     await user.click(button)
//     await user.type(input, "Asha")
//
// Usage:
//   const { user } = renderPage(<Page />);
export function renderPage(page: ReactElement) {
  const user = userEvent.setup();
  const result = render(<MemoryRouter>{page}</MemoryRouter>);
  return { user, ...result };
}
