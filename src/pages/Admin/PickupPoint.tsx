import { useMemo, useState } from "react";
import SidebarHeader from "@/components/layouts/SidebarHeader";
import { useGetPickupPointsQuery } from "@/redux/features/pickupPoints/pickupPoint.api";
import Loading from "@/components/layouts/Loading";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PickupPointItem = {
  id: string;
  name: string;
  address: string | null;
};

const PickupPoint = () => {
  const { data: pickupPointRes, isLoading, error } = useGetPickupPointsQuery(undefined);
  const [search, setSearch] = useState("");

  // Assuming your API response shape: { statusCode, success, message, data: [...] }
  const pickupPoints: PickupPointItem[] = useMemo(() => pickupPointRes?.data ?? [], [pickupPointRes]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return pickupPoints;
    return pickupPoints.filter((p) => {
      const name = (p.name ?? "").toLowerCase();
      const address = (p.address ?? "").toLowerCase();
      return name.includes(q) || address.includes(q);
    });
  }, [pickupPoints, search]);

  return (
    <div>
      <SidebarHeader heading="Dashboard" subHeading="Pick Up Points" />

      <div className="px-4 py-3 md:px-8">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold">All Pickup Points</h1>
            <p className="text-sm text-muted-foreground">
              View pickup point name and location details.
            </p>
          </div>

          <div className="flex w-full items-center gap-3 md:w-auto">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or address..."
              className="w-full md:w-[320px]"
            />
            <div className="rounded-md border bg-muted px-3 py-2 text-sm">
              Total: <span className="font-medium">{pickupPoints.length}</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="rounded-md border p-4 text-sm text-destructive">
            Failed to load pickup points.
          </div>
        ) : (
          <div className="rounded-lg border bg-background">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[220px]">Name</TableHead>
                    <TableHead className="min-w-[320px]">Address / Location</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="py-10 text-center text-sm text-muted-foreground">
                        No pickup points found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {p.address ? p.address : <span className="italic">N/A</span>}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupPoint;
