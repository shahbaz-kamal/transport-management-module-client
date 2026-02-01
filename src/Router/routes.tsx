import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path:"/admin",
    Component:DashboardLayout
  }
]);
