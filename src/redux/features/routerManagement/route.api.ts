import { baseApi } from "@/redux/baseApi";
import type { IResponse, IRoute, IRouteFeeUpdate } from "@/types";

export const routeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoutes: builder.query<IResponse<IRoute[]>, undefined>({
      query: () => ({
        url: "/route/",
        method: "GET",
      }),
      providesTags: ["ROUTES"],
    }),
    updateRouteFees: builder.mutation<IResponse<IRoute>, IRouteFeeUpdate>({
      query: (routeInfo) => ({
        url: "/route/update-route",
        method: "PATCH",
        data: routeInfo,
      }),
      invalidatesTags:["ROUTES"]
    }),
  }),
});

export const { useGetAllRoutesQuery, useUpdateRouteFeesMutation } = routeApi;
