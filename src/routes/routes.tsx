import ErrorPage from "@/pages/ErrorPage";
import { EventPage } from "@/pages/EventPage";
import { LoginPage } from "@/pages/LoginPage";
import AuthRoute from "@/routes/AuthRoute";
import PrivateRoute from "@/routes/PrivateRoute";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute />,
    children: [{ path: "/", element: <LoginPage /> }],
    errorElement: <ErrorPage />,
  },
  {
    path: "",
    element: <PrivateRoute />,
    children: [{ path: "/dashboard", element: <EventPage /> }],
    errorElement: <ErrorPage />,
  },
]);
