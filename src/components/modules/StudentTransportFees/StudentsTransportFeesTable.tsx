/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { IAllStudent, IRouteWithPickUp, IUser } from "@/types";

import AssignTransportModal from "./AssignTransportModal";
import TransportRouteDetailsModal from "./TransportRouteDetailsModal";
import VehicleDetailsModal from "../Vehicles/vehicleDetailsModal";

type Props = {
  students: IAllStudent[];
  routes: IRouteWithPickUp[];
};

export default function StudentTransportFeesTable({ students, routes }: Props) {
  const rows = useMemo(() => students ?? [], [students]);

  const [assignOpen, setAssignOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IUser | null>(null);

  const [routeOpen, setRouteOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<IRouteWithPickUp | null>(
    null,
  );

  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);

  const handleAssignClick = (student: IAllStudent) => {
    const asUser: IUser = {
      id: student.id,
      email: student.email,
      name: student.name,
      role: student.role as any,
      address: student.address,
      isRouteAssigned: student.isRouteAssigned,
      createdAt: new Date(student.createdAt),
      updatedAt: new Date(student.updatedAt),
    };

    setSelectedStudent(asUser);
    setAssignOpen(true);
  };

  const handleRouteClick = (routeId?: string) => {
    if (!routeId) return;
    const r = routes.find((x) => x.id === routeId) ?? null;
    setSelectedRoute(r);
    setRouteOpen(true);
  };

  const handleVehicleClick = (vehicleId?: string) => {
    if (!vehicleId) return;

    let found: any | null = null;

    for (const r of routes) {
      const v = r.vehicles?.find((x) => x.id === vehicleId);
      if (v) {
        found = {
          ...v,
          route: {
            id: r.id,
            name: r.name,
            startPoint: r.startPoint,
            endPoint: r.endPoint,
            monthlyFee: r.monthlyFee,
          },
        };
        break;
      }
    }

    if (!found) return;

    setSelectedVehicle(found);
    setVehicleOpen(true);
  };

  return (
    <>
      <Card className="rounded-lg border bg-background">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Assigned Route</TableHead>
                <TableHead>Assigned Vehicle</TableHead>
                <TableHead>Pickup Point</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    No students found.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((s) => {
                  const latest = s.transportAsStudent?.[0];

                  const routeId = latest?.route?.id;
                  const routeName = latest?.route?.name;

                  const vehicleId = latest?.vehicle?.id;
                  const vehicleNo = latest?.vehicle?.vehicleNo;

                  const pickupName = latest?.pickupPoint?.name;

                  const latestFee = s.student?.[0];
                  const month = latestFee?.month;
                  const year = latestFee?.year;

                  const isAssigned =
                    Boolean(s.isRouteAssigned) ||
                    Boolean(routeId || vehicleId || pickupName);

                  return (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">
                        {s.name || "N/A"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {s.email}
                      </TableCell>

                      <TableCell>
                        {routeId ? (
                          <button
                            type="button"
                            onClick={() => handleRouteClick(routeId)}
                            className="rounded-md bg-muted px-2 py-1 text-sm font-medium hover:underline cursor-pointer"
                          >
                            {routeName ?? "Assigned"}
                          </button>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Not assigned
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        {vehicleId ? (
                          <button
                            type="button"
                            onClick={() => handleVehicleClick(vehicleId)}
                            className="rounded-md bg-muted px-2 py-1 text-sm font-medium hover:underline cursor-pointer"
                          >
                            {vehicleNo ?? "Assigned"}
                          </button>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Not assigned
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        {pickupName ? (
                          <span className="rounded-md bg-muted px-2 py-1 text-sm font-medium">
                            {pickupName}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Not assigned
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        {month ? (
                          <span className="rounded-md bg-muted px-2 py-1 text-sm font-medium">
                            {month}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        {year ? (
                          <span className="rounded-md bg-muted px-2 py-1 text-sm font-medium">
                            {year}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        {isAssigned ? (
                          <Button size="sm" variant="outline" disabled>
                            Assigned
                          </Button>
                        ) : (
                          <Button
                            className="cursor-pointer"
                            size="sm"
                            variant="outline"
                            onClick={() => handleAssignClick(s)}
                          >
                            Assign Route
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <AssignTransportModal
        open={assignOpen}
        onOpenChange={setAssignOpen}
        student={selectedStudent}
        routes={routes}
      />

      <TransportRouteDetailsModal
        open={routeOpen}
        onOpenChange={setRouteOpen}
        route={selectedRoute}
      />

      <VehicleDetailsModal
        open={vehicleOpen}
        onOpenChange={setVehicleOpen}
        vehicle={selectedVehicle}
      />
    </>
  );
}
