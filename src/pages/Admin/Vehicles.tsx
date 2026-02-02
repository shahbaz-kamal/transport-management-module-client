/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import SidebarHeader from "@/components/layouts/SidebarHeader";
import { useGetAllVehiclesQuery } from "@/redux/features/vehicles/vehicles.api";
import VehiclesTable from "@/components/modules/Vehicles/VehiclesTable";

import { Card } from "@/components/ui/card";
import Loading from "@/components/layouts/Loading";
import VehicleDetailsModal from "@/components/modules/Vehicles/vehicleDetailsModal";

const Vehicles = () => {
  const { data: vehicleData, isLoading, error } = useGetAllVehiclesQuery(undefined);

  const vehicles = useMemo(() => vehicleData?.data ?? [], [vehicleData]);

  const total = vehicles.length;
  const assigned = vehicles.filter((v: any) => !!v.route).length;
  const unassigned = total - assigned;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);

  const onView = (vehicle: any) => {
    setSelected(vehicle);
    setOpen(true);
  };

  return (
    <div>
      <SidebarHeader heading="Dashboard" subHeading="Vehicles" />

      <div className="px-4 py-3 md:px-8">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Vehicles</h1>
          <p className="text-sm text-muted-foreground">View vehicles and their assigned routes.</p>
        </div>

        {/* Summary cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total Vehicles</p>
            <p className="mt-1 text-2xl font-semibold">{total}</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Assigned</p>
            <p className="mt-1 text-2xl font-semibold">{assigned}</p>
          </Card>

          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Unassigned</p>
            <p className="mt-1 text-2xl font-semibold">{unassigned}</p>
          </Card>
        </div>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="rounded-md border p-4 text-sm text-destructive">Failed to load vehicles.</div>
        ) : (
          <VehiclesTable vehicleData={vehicleData} onView={onView} />
        )}

        <VehicleDetailsModal open={open} onOpenChange={setOpen} vehicle={selected} />
      </div>
    </div>
  );
};

export default Vehicles;
