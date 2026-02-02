import Loading from "@/components/layouts/Loading";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import type { Trole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const checkAuth = (Component: ComponentType, requiredRoles?: Trole[]) => {
  return function AuthWrapper() {
    const { data: userData, isLoading } = useGetMeQuery(undefined);

    if (isLoading) return <Loading />;

    if (!isLoading && !userData?.data?.email) return <Navigate to="/login"></Navigate>;

    if (requiredRoles && !isLoading && (!userData?.data?.role || !requiredRoles.includes(userData.data.role))) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component></Component>;
  };
};
