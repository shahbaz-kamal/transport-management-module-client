import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: any | null; 
};

export default function VehicleDetailsModal({ open, onOpenChange, vehicle }: Props) {
  const route = vehicle?.route;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Vehicle Details</DialogTitle>
          <DialogDescription>Vehicle + route information</DialogDescription>
        </DialogHeader>

        {!vehicle ? (
          <div className="py-8 text-sm text-muted-foreground">No vehicle selected.</div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">Vehicle No</span>
                <span className="font-medium">{vehicle.vehicleNo}</span>
              </div>

              <div className="mt-2 flex justify-between gap-3">
                <span className="text-muted-foreground">Driver</span>
                <span className="font-medium">{vehicle.driverName}</span>
              </div>

              <div className="mt-2 flex justify-between gap-3">
                <span className="text-muted-foreground">Contact</span>
                <span className="font-medium">{vehicle.contactNo}</span>
              </div>
            </div>

            <div className="rounded-lg border p-4 text-sm">
              <p className="mb-2 font-semibold">Route Info</p>

              {!route ? (
                <p className="text-muted-foreground">No route assigned.</p>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Route Name</span>
                    <span className="font-medium">{route.name}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Start → End</span>
                    <span className="font-medium">
                      {route.startPoint} → {route.endPoint}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Monthly Fee</span>
                    <span className="font-medium">৳ {route.monthlyFee}</span>
                  </div>
                </div>
              )}
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
  );
}
