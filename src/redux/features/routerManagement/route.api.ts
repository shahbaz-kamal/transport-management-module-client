import { baseApi } from "@/redux/baseApi";
import type {
  IAddRouteFormValues,
  IResponse,
  IRoute,
  IRouteFeeUpdate,
  IRouteWithPickUp,
  IStudentAssignResult,
  IStudentFeeAndTransportAssign,
} from "@/types";

export const routeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoutes: builder.query<IResponse<IRoute[]>, undefined>({
      query: () => ({
        url: "/route/",
        method: "GET",
      }),
      providesTags: ["ROUTES"],
    }),
    getAllRoutesWithPickup: builder.query<IResponse<IRouteWithPickUp[]>, undefined>({
      query: () => ({
        url: "/route/route-with-pickup",
        method: "GET",
      }),
      providesTags: ["ROUTES-WITH_PICKUP"],
    }),
    updateRouteFees: builder.mutation<IResponse<IRoute>, IRouteFeeUpdate>({
      query: (routeInfo) => ({
        url: "/route/update-route",
        method: "PATCH",
        data: routeInfo,
      }),
      invalidatesTags: ["ROUTES", "ROUTES-WITH_PICKUP"],
    }),
    createRoute: builder.mutation<IResponse<IRouteWithPickUp>, IAddRouteFormValues>({
      query: (routeInfo) => ({
        url: "/route/create-route",
        method: "POST",
        data: routeInfo,
      }),
      invalidatesTags: ["ROUTES-WITH_PICKUP", "ROUTES"],
    }),
    assignRoutes: builder.mutation<IResponse<IStudentAssignResult>, IStudentFeeAndTransportAssign>({
      query: (info) => ({
        url: "/route/assign-route",
        method: "POST",
        data: info,
      }),
      invalidatesTags: ["ROUTES-WITH_PICKUP", "ROUTES", "USER", "STUDENT"],
    }),
  }),
});

export const {
  useGetAllRoutesQuery,
  useUpdateRouteFeesMutation,
  useGetAllRoutesWithPickupQuery,
  useCreateRouteMutation,
  useAssignRoutesMutation,
} = routeApi;
