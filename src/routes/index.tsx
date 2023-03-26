import { createBrowserRouter } from "react-router-dom";
import { GeneratePage } from "../views/generate";
import { RedirectPage } from "../views/redirect";
import { UserPage } from "../views/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GeneratePage />,
  },
  {
    path: "/generate",
    element: <GeneratePage />,
  },
  {
    path: "/redirect/:uuid",
    element: <RedirectPage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
]);

export { router };
