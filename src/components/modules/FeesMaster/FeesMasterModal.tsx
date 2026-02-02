/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { IRoute } from "@/types";
import { format } from "date-fns";
import { useUpdateRouteFeesMutation } from "@/redux/features/routerManagement/route.api";
import { toast } from "sonner";

type Props = {
  open: boolean;
  route: IRoute | null;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  onSubmitFee: (routeId: string, monthlyFee: number) => void;
};

export default function FeesMasterModal({ open, route, onOpenChange, onClose, onSubmitFee }: Props) {
  const [updateRouteFees] = useUpdateRouteFeesMutation();
  const [fee, setFee] = useState<string>("");

  // Seting default fee when modal opens / route changes
  useEffect(() => {
    if (route) setFee(String(route.monthlyFee));
  }, [route]);

  const createdText = useMemo(() => {
    if (!route?.createdAt) return "-";
    return format(new Date(route.createdAt), "dd MMM yyyy, hh:mm a");
  }, [route?.createdAt]);

  const handleSubmit = async () => {
    if (!route) return;

    const numericFee = Number(fee);
    if (Number.isNaN(numericFee) || numericFee < 0) {
   
      toast.error("Please enter a valid monthly fee");
      return;
    }
    const newData = { routeId: route.id, monthlyFee: numericFee };

    console.log(newData);

    // const toastId=toast.loading("Updating fees")
    try {
      const result = await updateRouteFees(newData);
      if (result?.data?.success) {
        toast.success("Price updated successfully");
        onSubmitFee(route.id, numericFee);
      }
      //   console.log(result);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Route Fee</DialogTitle>
          <DialogDescription>Edit the monthly fee for this route.</DialogDescription>
        </DialogHeader>

        {!route ? (
          <div className="py-6 text-sm text-muted-foreground">No route selected.</div>
        ) : (
          <div className="space-y-4">
            {/* Route info */}
            <div className="rounded-md border bg-muted/30 p-3">
              <div className="grid gap-2 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-muted-foreground">Route</span>
                  <span className="font-medium">{route.name}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-muted-foreground">Path</span>
                  <span className="font-medium">
                    {route.startPoint} → {route.endPoint}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">{createdText}</span>
                </div>
              </div>
            </div>

            {/* Fee input */}
            <div className="grid gap-2">
              <Label htmlFor="monthlyFee">Monthly Fee (BDT)</Label>
              <Input id="monthlyFee" type="number" value={fee} onChange={(e) => setFee(e.target.value)} placeholder="Enter monthly fee" />
              <p className="text-xs text-muted-foreground">Current fee is pre-filled. Update and submit to save.</p>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>

          <Button type="button" onClick={handleSubmit} disabled={!route}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
