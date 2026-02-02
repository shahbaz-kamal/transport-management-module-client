/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IVehicle } from "@/types/vehicle.type";

export const vehicleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVehicles: builder.query<IResponse<IVehicle[]>, undefined>({
      query: () => ({
        url: "/vehicle",
        method: "GET",
      }),
      providesTags: ["VEHICLES"],
    }),
  }),
});

export const { useGetAllVehiclesQuery } = vehicleApi;
