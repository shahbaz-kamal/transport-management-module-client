import Loading from "@/components/layouts/Loading";
import SidebarHeader from "@/components/layouts/SidebarHeader";
import AddRouteForm from "@/components/modules/RoutesManagement/AddRouteForm";
import RoutesTable from "@/components/modules/RoutesManagement/RoutesTable";

import { useGetAllRoutesWithPickupQuery } from "@/redux/features/routerManagement/route.api";

const Routes = () => {
  const { data: routeDetails, isLoading, error } = useGetAllRoutesWithPickupQuery(undefined);

  return (
    <div>
      <SidebarHeader heading="Dashboard" subHeading="Manage Routes" />

      <div className="px-4 py-3 md:px-8">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Routes</h1>
          <p className="text-sm text-muted-foreground">
            Create routes with pickup points and view route details.
          </p>
        </div>

        <AddRouteForm />

        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="rounded-md border p-4 text-sm text-destructive">
            Failed to load routes.
          </div>
        ) : (
          <RoutesTable routeDetails={routeDetails} />
        )}
      </div>
    </div>
  );
};

export default Routes;
