import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { adminSidebarItems } from "@/constant/adminSidebarItems";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";

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
    path: "/admin",
    Component: DashboardLayout,
    children: [{ index: true, element: <Navigate to="/admin/fees-master"></Navigate> }, ...generateRoutes(adminSidebarItems)],
  },
]);
