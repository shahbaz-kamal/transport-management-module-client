// RouteDetailsModal.tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { IRouteWithPickUp } from "@/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  route: IRouteWithPickUp | null;
};

export default function TransportRouteDetailsModal({ open, onOpenChange, route }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>Route Details</DialogTitle>
          <DialogDescription>Route info with pickup points.</DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto pr-2">
          {!route ? (
            <div className="py-8 text-sm text-muted-foreground">No route selected.</div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md border bg-muted/30 p-3 text-sm">
                <div className="flex flex-wrap justify-between gap-2">
                  <span className="text-muted-foreground">Route</span>
                  <span className="font-medium">{route.name}</span>
                </div>
                <div className="mt-2 flex flex-wrap justify-between gap-2">
                  <span className="text-muted-foreground">Path</span>
                  <span className="font-medium">
                    {route.startPoint} → {route.endPoint}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap justify-between gap-2">
                  <span className="text-muted-foreground">Monthly Fee</span>
                  <span className="font-medium">৳ {route.monthlyFee}</span>
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
                      {route.pickupPoints?.length ? (
                        [...route.pickupPoints]
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
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
