/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import type { IUser, IRouteWithPickUp } from "@/types";
import { useAssignRoutesMutation } from "@/redux/features/routerManagement/route.api";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: IUser | null;
  routes: IRouteWithPickUp[];
};

type FormValues = {
  routeId: string;
  pickupPointId: string;
  vehicleId: string;
};

export default function AssignTransportModal({ open, onOpenChange, student, routes }: Props) {
  const {
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { routeId: "", pickupPointId: "", vehicleId: "" },
  });

  const [assignRoutes] = useAssignRoutesMutation();

  const routeId = watch("routeId");
  const pickupPointId = watch("pickupPointId");
  const vehicleId = watch("vehicleId");

  const selectedRoute = useMemo(() => routes.find((r) => r.id === routeId), [routes, routeId]);

  const pickupOptions = useMemo(() => {
    if (!selectedRoute) return [];
    return [...(selectedRoute.pickupPoints ?? [])].sort((a, b) => a.stopOrder - b.stopOrder);
  }, [selectedRoute]);

  const vehicleOptions = useMemo(() => {
    if (!selectedRoute) return [];
    return selectedRoute.vehicles ?? [];
  }, [selectedRoute]);

  const selectedPickup = useMemo(() => {
    if (!selectedRoute || !pickupPointId) return undefined;
    return pickupOptions.find((p) => p.id === pickupPointId);
  }, [pickupOptions, pickupPointId, selectedRoute]);

  const selectedVehicle = useMemo(() => {
    if (!selectedRoute || !vehicleId) return undefined;
    return vehicleOptions.find((v) => v.id === vehicleId);
  }, [vehicleOptions, vehicleId, selectedRoute]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  useEffect(() => {
    setValue("pickupPointId", "");
    setValue("vehicleId", "");
  }, [routeId, setValue]);

  useEffect(() => {
    setValue("vehicleId", "");
  }, [pickupPointId, setValue]);

 

  const onSubmit = async (values: FormValues) => {

    const amount = selectedRoute?.monthlyFee;
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear());
    if (!student?.id) return;
    const payload = {
      feeAssign: {
        userId: student.id,
        amount,
        month,
        year,
        status: "UNPAID",
      },
      transportAssign: {
        userId: student.id,
        routeId: values.routeId,
        vehicleId: values.vehicleId,
        pickupPointId: values.pickupPointId,
      },
    };
    // console.log("Assign transport payload:", {
    //   studentId: student?.id,
    //   month,
    //   year,
    //   route: {
    //     id: values.routeId,
    //     name: selectedRoute?.name,
    //     monthlyFee: selectedRoute?.monthlyFee,
    //   },
    //   pickupPoint: {
    //     id: values.pickupPointId,
    //     name: selectedPickup?.name,
    //     stopOrder: selectedPickup?.stopOrder,
    //     routePickupPointId: selectedPickup?.routePickupPointId,
    //   },
    //   vehicle: {
    //     id: values.vehicleId,
    //     vehicleNo: selectedVehicle?.vehicleNo,
    //     driverName: selectedVehicle?.driverName,
    //     contactNo: selectedVehicle?.contactNo,
    //   },
    // });
    console.log(payload);
    const toastId = toast.loading("Assigning student");
    try {
      const result = await assignRoutes(payload).unwrap();
      if (result?.success) {
        toast.success("Student assigned successfully", { id: toastId });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message, { id: toastId });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>Assign Transport</DialogTitle>
          <DialogDescription>Select route, pickup point, and vehicle.</DialogDescription>
        </DialogHeader>

        {!student ? (
          <div className="py-8 text-sm text-muted-foreground">No student selected.</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 min-h-0 overflow-y-auto pr-2">
              <div className="space-y-4">
                <Card className="rounded-md border bg-muted/30 p-3">
                  <div className="flex flex-wrap justify-between gap-2 text-sm">
                    <span className="text-muted-foreground">Student</span>
                    <span className="font-medium">{student.name || "N/A"}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{student.email}</span>
                  </div>
                </Card>

                <div className="space-y-2">
                  <Label>Route</Label>
                  <Select value={routeId} onValueChange={(val) => setValue("routeId", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a route" />
                    </SelectTrigger>
                    <SelectContent>
                      {routes.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.name} — ৳ {r.monthlyFee}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Pickup Point</Label>
                  <Select value={pickupPointId} onValueChange={(val) => setValue("pickupPointId", val)} disabled={!selectedRoute}>
                    <SelectTrigger>
                      <SelectValue placeholder={!selectedRoute ? "Select route first" : "Select pickup point"} />
                    </SelectTrigger>
                    <SelectContent>
                      {pickupOptions.map((p) => (
                        <SelectItem key={p.routePickupPointId} value={p.id}>
                          {p.stopOrder}. {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedRoute && pickupOptions.length === 0 && (
                    <p className="text-xs text-muted-foreground">No pickup points under this route.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Vehicle</Label>
                  <Select value={vehicleId} onValueChange={(val) => setValue("vehicleId", val)} disabled={!selectedRoute || !pickupPointId}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !selectedRoute ? "Select route first" : !pickupPointId ? "Select pickup point first" : "Select vehicle"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleOptions.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          {v.vehicleNo} — {v.driverName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedRoute && vehicleOptions.length === 0 && (
                    <p className="text-xs text-muted-foreground">No vehicles under this route.</p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="sm:justify-end pt-4 border-t">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>

              <Button type="submit" disabled={!routeId || !pickupPointId || !vehicleId || isSubmitting}>
                Confirm Assign
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
