import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  vehicleData?: any; 
  onView: (vehicle: any) => void;
};

export default function VehiclesTable({ vehicleData, onView }: Props) {
  const vehicles = useMemo(() => vehicleData?.data ?? [], [vehicleData]);

  return (
    <Card className="rounded-lg border bg-background">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[140px]">Vehicle No</TableHead>
              <TableHead className="min-w-[180px]">Driver</TableHead>
              <TableHead className="min-w-[160px]">Contact</TableHead>
              <TableHead className="min-w-[240px]">Route</TableHead>
              <TableHead className="min-w-[140px]">Fee</TableHead>
              <TableHead className="min-w-[120px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {vehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                  No vehicles found.
                </TableCell>
              </TableRow>
            ) : (
              vehicles.map((v: any) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.vehicleNo}</TableCell>
                  <TableCell>{v.driverName}</TableCell>
                  <TableCell className="text-muted-foreground">{v.contactNo}</TableCell>

                  <TableCell className="text-muted-foreground">
                    {v.route ? (
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{v.route.name}</span>
                        <span className="text-xs">
                          {v.route.startPoint} → {v.route.endPoint}
                        </span>
                      </div>
                    ) : (
                      <span className="rounded-md bg-muted px-2 py-1 text-xs">Unassigned</span>
                    )}
                  </TableCell>

                  <TableCell>
                    {v.route ? (
                      <span className="rounded-md bg-muted px-2 py-1 text-sm font-medium">৳ {v.route.monthlyFee}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => onView(v)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
