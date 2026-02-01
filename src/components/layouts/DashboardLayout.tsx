import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "../Sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* sidebar header starts */}
        {/* will be updated later*/}
        {/* sidebar header ends */}

        <Outlet></Outlet>
      </SidebarInset>
    </SidebarProvider>
  );
}
