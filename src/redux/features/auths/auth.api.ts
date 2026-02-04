/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ILogin, IRegister } from "@/types/auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<any>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
    register: builder.mutation<IResponse<any>, IRegister>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER","ROUTES","PICKUP-PONTS","ROUTES-WITH_PICKUP","VEHICLES","STUDENT"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
