/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { IAddRouteFormValues } from "@/types";
import { useCreateRouteMutation } from "@/redux/features/routerManagement/route.api";
import { toast } from "sonner";

const AddRouteForm = () => {
  const [createRoute] = useCreateRouteMutation();

  const form = useForm<IAddRouteFormValues>({
    defaultValues: {
      name: "",
      startPoint: "",
      endPoint: "",
      monthlyFee: 0,
      pickupPoints: [{ name: "", address: "", stopOrder: 1 }],
    },
    mode: "onSubmit",
  });

  const { control, handleSubmit, watch, setError, clearErrors } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pickupPoints",
  });

  const pickupPoints = watch("pickupPoints");

  const onSubmit = async (values: IAddRouteFormValues) => {
    // minimum pickup points check
    if (values.pickupPoints.length < 2) {
      setError("pickupPoints", {
        type: "manual",
        message: "At least two pickup points are required",
      });
      return;
    }

    //  stopOrder uniqueness check
    const orders = values.pickupPoints.map((p) => Number(p.stopOrder));
    if (new Set(orders).size !== orders.length) {
      setError("pickupPoints", {
        type: "manual",
        message: "stopOrder must be unique within the route",
      });
      return;
    }

    clearErrors("pickupPoints");

    const payload = {
      name: values.name.trim(),
      startPoint: values.startPoint.trim(),
      endPoint: values.endPoint.trim(),
      monthlyFee: Number(values.monthlyFee),
      pickupPoints: values.pickupPoints
        .map((p) => ({
          name: p.name.trim(),
          address: p.address.trim(),
          stopOrder: Number(p.stopOrder),
        }))
        .sort((a, b) => a.stopOrder - b.stopOrder),
    };

    console.log("Backend expected payload:", payload);
    const toastId = toast.loading("Adding Route");
    try {
      const result = await createRoute(payload);
      if (result?.data?.success) {
        toast.success("Route added successfully", { id: toastId });
        console.log(result);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const addPickupPoint = () => {
    const nextStopOrder = (pickupPoints?.length ?? 0) + 1;
    append({ name: "", address: "", stopOrder: nextStopOrder });
  };

  return (
    <div className="flex flex-col gap-6 mb-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Add New Route</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Route fields */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={control}
                  name="name"
                  rules={{ required: "Route name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Route Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="JFP - School" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="monthlyFee"
                  rules={{
                    required: "Monthly fee is required",
                    min: { value: 0, message: "Fee cannot be negative" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Fee (BDT) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1500"
                          value={field.value ?? 0}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="startPoint"
                  rules={{ required: "Start point is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Point *</FormLabel>
                      <FormControl>
                        <Input placeholder="Jamuna Future Park" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="endPoint"
                  rules={{ required: "End point is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Point *</FormLabel>
                      <FormControl>
                        <Input placeholder="Mirpur 12 (School)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Pickup points */}
              <div className="space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold">Pickup Points</h3>
                    <p className="text-sm text-muted-foreground">Add pickup points with stop order.</p>
                  </div>

                  <Button type="button" variant="outline" onClick={addPickupPoint}>
                    + Add Pickup Point
                  </Button>
                </div>

                {/* show stopOrder unique error here */}
                <FormField
                  control={control}
                  name="pickupPoints"
                  render={() => (
                    <FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  {fields.map((f, index) => (
                    <div key={f.id} className="rounded-lg border p-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <FormField
                          control={control}
                          name={`pickupPoints.${index}.name`}
                          rules={{ required: "Pickup name is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pickup Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Kuril Bishwa Road" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`pickupPoints.${index}.address`}
                          rules={{ required: "Address is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="Kuril, Vatara" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`pickupPoints.${index}.stopOrder`}
                          rules={{
                            required: "Stop order is required",
                            min: { value: 1, message: "Stop order must start from 1" },
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stop Order *</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="1"
                                  value={field.value ?? 1}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-3 flex justify-end">
                        <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)} disabled={fields.length === 1}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">Tip: Keep stopOrder unique (1,2,3...).</p>
              </div>

              <Button className="w-full hover:cursor-pointer" type="submit">
                Create Route
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddRouteForm;
