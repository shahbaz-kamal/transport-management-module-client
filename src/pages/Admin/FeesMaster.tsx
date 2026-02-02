import { useMemo, useState } from "react";
import SidebarHeader from "@/components/layouts/SidebarHeader";
import FeesMasterModal from "@/components/modules/FeesMaster/FeesMasterModal";
import FeesMasterTable from "@/components/modules/FeesMaster/FeesMasterTable";
import { useGetAllRoutesQuery } from "@/redux/features/routerManagement/route.api";
import type { IRoute } from "@/types";
import Loading from "@/components/layouts/Loading"


const FeesMaster = () => {
  const { data: routeRes, isLoading, error } = useGetAllRoutesQuery(undefined);

  const routes = useMemo(() => routeRes?.data ?? [], [routeRes]);

  const [open, setOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<IRoute | null>(null);

  const handleOpenModal = (route: IRoute) => {
    setSelectedRoute(route);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedRoute(null);
  };

  const handleSubmitFee = (routeId: string, monthlyFee: number) => {
    console.log("Update fee payload:", { routeId, monthlyFee });
    handleCloseModal();
  };

  return (
    <div>
      <SidebarHeader heading="Dashboard" subHeading="Fees Master" />

      <div className="px-4 py-3 md:px-8">
        <div className="mb-4 flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Manage All Routes Fee</h1>
          <p className="text-sm text-muted-foreground">
            Update monthly transport fee per route.
          </p>
        </div>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="rounded-md border p-4 text-sm text-destructive">
            Failed to load routes.
          </div>
        ) : (
          <FeesMasterTable routes={routes} onUpdateFeeClick={handleOpenModal} />
        )}

        <FeesMasterModal
          open={open}
          route={selectedRoute}
          onOpenChange={setOpen}
          onClose={handleCloseModal}
          onSubmitFee={handleSubmitFee}
        />
      </div>
    </div>
  );
};

export default FeesMaster;
