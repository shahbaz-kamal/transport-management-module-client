import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "../Sidebar";
import { Outlet } from "react-router";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import Loading from "./Loading";

export default function DashboardLayout() {
  const { data: userData, isLoading } = useGetMeQuery(undefined);
  if (isLoading) return <Loading></Loading>;
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
