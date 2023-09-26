import { ROUTES } from "../configs/routes";
import LoginPage from "../containers/LoginPage";
import Home from "../layouts/Home";

const routes = [
  {
    path: ROUTES.HOME,
    element: Home,
    meta: {
      middleware: ["auth"],
    },
  },
  {
    path: ROUTES.LOGIN,
    element: LoginPage,
    meta: {
      middleware: [],
    },
  },
];

export { routes };
