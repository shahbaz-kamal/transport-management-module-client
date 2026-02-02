/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IPickupPoint, IResponse } from "@/types";

export const pickupPointApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPickupPoints: builder.query<IResponse<IPickupPoint[]>, undefined>({
      query: () => ({
        url: "/pickup-point",
        method: "GET",
      }),
      providesTags: ["PICKUP-PONTS"],
    }),
  }),
});

export const { useGetPickupPointsQuery } = pickupPointApi;
