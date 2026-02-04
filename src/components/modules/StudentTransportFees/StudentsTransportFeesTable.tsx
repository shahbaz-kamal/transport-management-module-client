import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { IUser, IRouteWithPickUp } from "@/types";
import AssignTransportModal from "./AssignTransportModal";

type Props = {
  students: IUser[];
  routes: IRouteWithPickUp[];
};

type TransportRow = {
  route?: { id: string; name: string } | null;
  vehicle?: { id: string; vehicleNo: string } | null;
  pickupPoint?: { id: string; name: string } | null;
};

type StudentWithTransport = IUser & {
  transportAsStudent?: TransportRow[];
};

export default function StudentTransportFeesTable({ students, routes }: Props) {
  const rows = useMemo(() => (students ?? []) as StudentWithTransport[], [students]);

  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IUser | null>(null);

  const handleAssignClick = (student: IUser) => {
    setSelectedStudent(student);
    setOpen(true);
    console.log(student)
    console.log("modal clicked")
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
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                    No students found.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((s) => {
                  const latest = s.transportAsStudent?.[0];
                  const routeName = latest?.route?.name;
                  const vehicleNo = latest?.vehicle?.vehicleNo;
                  const pickupName = latest?.pickupPoint?.name;

                  const isAssigned = Boolean(s.isRouteAssigned) || Boolean(routeName || vehicleNo || pickupName);

                  return (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name || "N/A"}</TableCell>
                      <TableCell className="text-muted-foreground">{s.email}</TableCell>

                      <TableCell>
                        {isAssigned ? (
                          <span className="rounded-md bg-muted px-2 py-1 text-sm font-medium">
                            {routeName ?? "Assigned"}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Not assigned</span>
                        )}
                      </TableCell>

                      <TableCell>
                        {isAssigned ? (
                          <span className="rounded-md bg-muted px-2 py-1 text-sm font-medium">
                            {vehicleNo ?? "Assigned"}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Not assigned</span>
                        )}
                      </TableCell>

                      <TableCell>
                        {isAssigned ? (
                          <span className="rounded-md bg-muted px-2 py-1 text-sm font-medium">
                            {pickupName ?? "Assigned"}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Not assigned</span>
                        )}
                      </TableCell>

                      <TableCell>
                        {isAssigned ? (
                          <Button size="sm" variant="outline" disabled>
                            Assigned
                          </Button>
                        ) : (
                          <Button className="cursor-pointer" size="sm" variant="outline" onClick={() => handleAssignClick(s)}>
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

      <AssignTransportModal open={open} onOpenChange={setOpen} student={selectedStudent} routes={routes} />
    </>
  );
}
