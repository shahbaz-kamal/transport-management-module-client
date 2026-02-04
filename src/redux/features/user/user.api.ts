/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IAllStudent, IResponse, IStudentSelf, IUser } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IResponse<IUser>, undefined>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getAllStudents: builder.query<IResponse<IAllStudent[]>, undefined>({
      query: () => ({
        url: "/user/student",
        method: "GET",
      }),
      providesTags: ["STUDENT"],
    }),
    getMyData: builder.query<IResponse<IStudentSelf>, undefined>({
      query: () => ({
        url: "/user/student/myData",
        method: "GET",
      }),
      providesTags: ["STUDENT"],
    }),
  }),
});

export const { useGetMeQuery, useGetAllStudentsQuery, useGetMyDataQuery } = userApi;
