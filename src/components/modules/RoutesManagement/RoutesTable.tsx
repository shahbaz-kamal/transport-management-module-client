import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IRouteWithPickUp, IResponse } from "@/types";

type Props = {
  routeDetails?: IResponse<IRouteWithPickUp[]>;
};

export default function RoutesTable({ routeDetails }: Props) {
  const routes = useMemo(() => routeDetails?.data ?? [], [routeDetails]);

  const [open, setOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<IRouteWithPickUp | null>(null);

  const handleView = (route: IRouteWithPickUp) => {
    setSelectedRoute(route);
    setOpen(true);
  };

  return (
    <>
      <Card className="rounded-lg border bg-background">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[220px]">Route</TableHead>
                <TableHead className="min-w-[260px]">Start → End</TableHead>
                <TableHead className="min-w-[140px]">Monthly Fee</TableHead>
                <TableHead className="min-w-[150px]">Pickup Points</TableHead>
                <TableHead className="min-w-[120px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {routes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                    No routes found.
                  </TableCell>
                </TableRow>
              ) : (
                routes.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {r.startPoint} → {r.endPoint}
                    </TableCell>
                    <TableCell>
                      <span className="rounded-md bg-muted px-2 py-1 text-sm font-medium">৳ {r.monthlyFee}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{r.pickupPoints?.length ?? 0}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => handleView(r)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Details Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Route Details</DialogTitle>
            <DialogDescription>Route info with pickup points.</DialogDescription>
          </DialogHeader>

          {!selectedRoute ? (
            <div className="py-8 text-sm text-muted-foreground">No route selected.</div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md border bg-muted/30 p-3 text-sm">
                <div className="flex flex-wrap justify-between gap-2">
                  <span className="text-muted-foreground">Route</span>
                  <span className="font-medium">{selectedRoute.name}</span>
                </div>
                <div className="mt-2 flex flex-wrap justify-between gap-2">
                  <span className="text-muted-foreground">Path</span>
                  <span className="font-medium">
                    {selectedRoute.startPoint} → {selectedRoute.endPoint}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap justify-between gap-2">
                  <span className="text-muted-foreground">Monthly Fee</span>
                  <span className="font-medium">৳ {selectedRoute.monthlyFee}</span>
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="border-b px-4 py-3">
                  <p className="font-semibold">Pickup Points</p>
                  <p className="text-sm text-muted-foreground">Ordered by stopOrder</p>
                </div>

                <div className="w-full overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[100px]">Stop</TableHead>
                        <TableHead className="min-w-[220px]">Name</TableHead>
                        <TableHead className="min-w-[280px]">Address</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {selectedRoute.pickupPoints?.length ? (
                        [...selectedRoute.pickupPoints]
                          .sort((a, b) => a.stopOrder - b.stopOrder)
                          .map((p) => (
                            <TableRow key={p.routePickupPointId}>
                              <TableCell className="font-medium">{p.stopOrder}</TableCell>
                              <TableCell>{p.name}</TableCell>
                              <TableCell className="text-muted-foreground">{p.address}</TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="py-8 text-center text-sm text-muted-foreground">
                            No pickup points found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
