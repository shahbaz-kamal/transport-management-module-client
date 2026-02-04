import Loading from "@/components/layouts/Loading";
import SidebarHeader from "@/components/layouts/SidebarHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetMyDataQuery } from "@/redux/features/user/user.api";

const MyInfo = () => {
  const { data: myData, isLoading } = useGetMyDataQuery(undefined);

  if (isLoading) return <Loading />;

  const d = myData?.data;

  const fee = d?.fee;
  const transport = d?.transport;

  const isAssigned = Boolean(d?.isTransportAssigned);

  return (
    <div className="space-y-4 px-4 py-3 md:px-8">
      <SidebarHeader heading="Dashboard" subHeading="Current month fee & transport info" />

      {!d ? (
        <Card className="rounded-lg border bg-background p-6">
          <p className="text-sm text-muted-foreground">No data found.</p>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Fee Card */}
          <Card className="rounded-lg border bg-background p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Current Month Fee</p>
                <p className="mt-1 text-xl font-semibold">
                  {d.month} {d.year}
                </p>
              </div>

              <Badge variant={fee?.status === "PAID" ? "default" : "secondary"}>
                {fee?.status ?? "UNPAID"}
              </Badge>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">৳ {fee?.amount ?? 0}</span>
              </div>

              {fee?.createdAt ? (
                <div className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Assigned At</span>
                  <span className="font-medium">
                    {new Date(fee.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ) : null}
            </div>

            {!isAssigned ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Transport is not assigned yet, so no fee/route details are available.
              </p>
            ) : null}
          </Card>

          {/* Route Card */}
          <Card className="rounded-lg border bg-background p-5 lg:col-span-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Transport</p>
                <p className="mt-1 text-xl font-semibold">
                  {isAssigned ? "Assigned" : "Not assigned"}
                </p>
              </div>

              <Badge variant={isAssigned ? "default" : "secondary"}>
                {isAssigned ? "Active" : "Inactive"}
              </Badge>
            </div>

            <Separator className="my-4" />

            {!isAssigned ? (
              <div className="rounded-md border bg-muted/30 p-4 text-sm">
                <p className="font-medium">No route assigned</p>
                <p className="mt-1 text-muted-foreground">
                  Please contact admin to get assigned to a route, pickup point, and vehicle.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Route */}
                <div className="rounded-md border bg-muted/30 p-4">
                  <p className="mb-2 font-semibold">Route Info</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex flex-wrap justify-between gap-3">
                      <span className="text-muted-foreground">Route</span>
                      <span className="font-medium">{transport?.route.name}</span>
                    </div>
                    <div className="flex flex-wrap justify-between gap-3">
                      <span className="text-muted-foreground">Path</span>
                      <span className="font-medium">
                        {transport?.route.startPoint} → {transport?.route.endPoint}
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-between gap-3">
                      <span className="text-muted-foreground">Monthly Fee</span>
                      <span className="font-medium">৳ {transport?.route.monthlyFee}</span>
                    </div>
                  </div>
                </div>

                {/* Pickup + Vehicle */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border p-4">
                    <p className="mb-2 font-semibold">Pickup Point</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex flex-wrap justify-between gap-3">
                        <span className="text-muted-foreground">Name</span>
                        <span className="font-medium">{transport?.pickupPoint.name}</span>
                      </div>
                      <div className="flex flex-wrap justify-between gap-3">
                        <span className="text-muted-foreground">Address</span>
                        <span className="font-medium">{transport?.pickupPoint.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <p className="mb-2 font-semibold">Vehicle</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex flex-wrap justify-between gap-3">
                        <span className="text-muted-foreground">Vehicle No</span>
                        <span className="font-medium">{transport?.vehicle.vehicleNo}</span>
                      </div>
                      <div className="flex flex-wrap justify-between gap-3">
                        <span className="text-muted-foreground">Driver</span>
                        <span className="font-medium">{transport?.vehicle.driverName}</span>
                      </div>
                      <div className="flex flex-wrap justify-between gap-3">
                        <span className="text-muted-foreground">Contact</span>
                        <span className="font-medium">{transport?.vehicle.contactNo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {transport?.assignedAt ? (
                  <p className="text-sm text-muted-foreground">
                    Assigned on {new Date(transport?.assignedAt).toLocaleDateString()}
                  </p>
                ) : null}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default MyInfo;
