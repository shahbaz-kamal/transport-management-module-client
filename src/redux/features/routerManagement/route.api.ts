import { baseApi } from "@/redux/baseApi";
import type { IResponse, IRoute } from "@/types";

export const routeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoutes: builder.query<IResponse<IRoute[]>, undefined>({
      query: () => ({
        url: "/route/",
        method: "GET",
      }),
      providesTags: ["ROUTES"],
    }),
  }),
});

export const { useGetAllRoutesQuery } = routeApi;
