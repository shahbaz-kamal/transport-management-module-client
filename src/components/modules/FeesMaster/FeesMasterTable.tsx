import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IRoute } from "@/types";
import { format } from "date-fns";

type Props = {
  routes: IRoute[];
  onUpdateFeeClick: (route: IRoute) => void;
};

export default function FeesMasterTable({ routes, onUpdateFeeClick }: Props) {
  return (
    <div className="rounded-lg border bg-background">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[220px]">Route</TableHead>
              <TableHead className="min-w-[220px]">Start → End</TableHead>
              <TableHead className="min-w-[130px]">Monthly Fee</TableHead>
              <TableHead className="min-w-[170px]">Created</TableHead>
              <TableHead className="min-w-[170px]">Updated</TableHead>
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
              routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {route.startPoint} → {route.endPoint}
                  </TableCell>
                  <TableCell>
                    <span className="rounded-md bg-muted px-2 py-1 text-sm font-medium">
                      ৳ {route.monthlyFee}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(route.createdAt), "dd MMM yyyy, hh:mm a")}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(route.updatedAt), "dd MMM yyyy, hh:mm a")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateFeeClick(route)}
                    >
                      Update Fees
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
