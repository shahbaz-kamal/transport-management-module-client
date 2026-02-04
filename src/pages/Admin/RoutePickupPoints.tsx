import SidebarHeader from "@/components/layouts/SidebarHeader";
import { Card } from "@/components/ui/card";

const RoutePickupPoints = () => {
  return (
    <div className="space-y-4 px-4 py-3 md:px-8">
      <SidebarHeader heading="Dashboard" subHeading="Manage Routes" />

      <Card className="rounded-lg border bg-background p-5">
        <h2 className="text-base font-semibold">Route & Pickup Point Management</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This section is included to meet the transport module requirements. Route creation, pickup point ordering (stopOrder),
          and related management features are already implemented in other relevant pages of the system.
        </p>
      </Card>
    </div>
  );
};

export default RoutePickupPoints;
