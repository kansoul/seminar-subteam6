import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./app/guards/PrivateRoute";
import { DefaultLayout } from "./app/layouts/DefaultLayout";
import { routes } from "./app/routes";

function App() {
  const renderRoutes = (routeItems: any) => {
    const result = routeItems.map((route: any) => {
      const { path, element: Element, childrens, meta, ...rest } = route;
      const props = {
        ...rest,
        element: route.meta.middleware.includes("auth") ? (
          <PrivateRoute>
            <Element />
          </PrivateRoute>
        ) : (
          <Element />
        ),
      };
      const Layout = route.layout || DefaultLayout;

      return (
        <Route key={path} element={<Layout meta={meta} />}>
          <Route path={path} {...props}>
            {childrens && renderRoutes(childrens)}
          </Route>
        </Route>
      );
    });

    return result;
  };
  return <Routes>{renderRoutes(routes)}</Routes>;
}

export default App;
