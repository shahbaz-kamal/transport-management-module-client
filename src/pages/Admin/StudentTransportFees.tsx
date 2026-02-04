import Loading from "@/components/layouts/Loading";
import StudentTransportFeesTable from "@/components/modules/StudentTransportFees/StudentsTransportFeesTable";
import { useGetAllRoutesWithPickupQuery } from "@/redux/features/routerManagement/route.api";
import { useGetAllStudentsQuery } from "@/redux/features/user/user.api";
import type { IUser, IRouteWithPickUp } from "@/types";

const StudentTransportFees = () => {
  const { data: allRouteData, isLoading: routeLoading } = useGetAllRoutesWithPickupQuery(undefined);
  const { data: allStudentData, isLoading: studentLoading } = useGetAllStudentsQuery(undefined);

  if (routeLoading || studentLoading) return <Loading />;

  const routes: IRouteWithPickUp[] = allRouteData?.data ?? [];
  const students: IUser[] = allStudentData?.data ?? [];

  return (
    <div className="space-y-4 px-4 py-3 md:px-8">
      <div>
        <h1 className="text-xl font-semibold">Student Transport Fees</h1>
        <p className="text-sm text-muted-foreground">Assign students to route, pickup point, and vehicle.</p>
      </div>

      <StudentTransportFeesTable students={students} routes={routes} />
    </div>
  );
};

export default StudentTransportFees;
