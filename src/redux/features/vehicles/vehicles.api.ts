/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ICreateVehicle, IResponseCreateVehicle, IVehicle } from "@/types/vehicle.type";

export const vehicleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVehicles: builder.query<IResponse<IVehicle[]>, undefined>({
      query: () => ({
        url: "/vehicle",
        method: "GET",
      }),
      providesTags: ["VEHICLES"],
    }),
    createVehicle: builder.mutation<IResponse<IResponseCreateVehicle>, ICreateVehicle>({
      query: (vehicleInfo) => ({
        url: "/vehicle/create-vehicle",
        method: "POST",
        data: vehicleInfo,
      }),
    }),
  }),
});

export const { useGetAllVehiclesQuery, useCreateVehicleMutation } = vehicleApi;
