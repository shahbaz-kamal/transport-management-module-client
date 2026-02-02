/* eslint-disable @typescript-eslint/no-explicit-any */
import SidebarHeader from "@/components/layouts/SidebarHeader";
import { useGetAllRoutesQuery } from "@/redux/features/routerManagement/route.api";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ICreateVehicle } from "@/types/vehicle.type";
import { useCreateVehicleMutation } from "@/redux/features/vehicles/vehicles.api";
import { toast } from "sonner";

const AssignVehicles = () => {
  const { data: routeData, isLoading } = useGetAllRoutesQuery(undefined);
  const [createVehicle] = useCreateVehicleMutation();
  const routes = routeData?.data ?? [];

  const form = useForm<ICreateVehicle>({
    defaultValues: {
      routeId: "",
      vehicleNo: "",
      driverName: "",
      contactNo: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: ICreateVehicle) => {
    const payload = {
      routeId: values.routeId,
      vehicleNo: values.vehicleNo.trim(),
      driverName: values.driverName.trim(),
      contactNo: values.contactNo.trim(),
    };

    console.log(payload);
    const toastId = toast.loading("Vehicle is creating");
    try {
      const result = await createVehicle(payload).unwrap();
      if (result?.success) {
        toast.success("Vehicle Created Successfully", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
      console.log(error);
    }
  };

  return (
    <div>
      <SidebarHeader heading="Dashboard" subHeading="Assign / Create Vehicles" />

      <div className="px-4 py-3 md:px-8">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Assign / Create Vehicle</h1>
          <p className="text-sm text-muted-foreground">Create a vehicle and attach it to a route.</p>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Add Vehicle</CardTitle>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="routeId"
                      rules={{ required: "Route is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Route *</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={(val) => field.onChange(val)}
                            disabled={isLoading || routes.length === 0}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  placeholder={
                                    isLoading ? "Loading routes..." : routes.length === 0 ? "No routes available" : "Select a route"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {routes.map((r: any) => (
                                <SelectItem key={r.id} value={r.id}>
                                  {r.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vehicleNo"
                      rules={{
                        required: "Vehicle number is required",
                        pattern: {
                          value: /^VH-\d{2}$/i,
                          message: "Vehicle no must be like VH-01, VH-02",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle No *</FormLabel>
                          <FormControl>
                            <Input placeholder="VH-01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="driverName"
                      rules={{
                        required: "Driver name is required",
                        minLength: { value: 2, message: "Driver name must be at least 2 characters" },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Driver Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Salam" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactNo"
                      rules={{
                        required: "Contact number is required",
                        minLength: { value: 8, message: "Contact number looks too short" },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact No *</FormLabel>
                          <FormControl>
                            <Input placeholder="01799839985" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button className="w-full hover:cursor-pointer" type="submit" disabled={isLoading || routes.length === 0}>
                    Save Vehicle
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssignVehicles;
