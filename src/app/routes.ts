import { createBrowserRouter } from "react-router";
import Main from "./Pages/Main";
import Language from "./Pages/Language";
import RSVP from "./Pages/RSVP";
import Invitation from "./Pages/Invitation";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Main },
      { path: "language", Component: Language },
      { path: "rsvp", Component: RSVP },
      { path: "invitation", Component: Invitation },
    ],
  },
]);
