import SidebarHeader from "@/components/layouts/SidebarHeader";
import { useGetAllRoutesQuery } from "@/redux/features/routerManagement/route.api";

const FeesMaster = () => {
  const { data: routeData, isLoading, error } = useGetAllRoutesQuery(undefined);

  console.log(routeData);
  console.log(error);
  return (
    <div>
      <SidebarHeader heading="Dashboard" subHeading="Fees Master"></SidebarHeader>
      <div className="px-8 py-3">
        {" "}
        <h1>This is FeesMaster Component</h1>
      </div>
    </div>
  );
};

export default FeesMaster;
