import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "./redux/features/user/user.api";
import Loading from "./components/layouts/Loading";
import { Navigate } from "react-router";
import { roleEnum } from "./types";

function App() {
  const { data: myData, isLoading } = useGetMeQuery(undefined);

  if (isLoading) return <Loading></Loading>;

  if (!myData) return <Navigate to={"/login"}></Navigate>;

  if (myData.data.role === roleEnum[0] || myData?.data.role === roleEnum[1]) return <Navigate to={"/admin"}></Navigate>;

  if (myData.data.role === roleEnum[2]) return <Navigate to={"/student"}></Navigate>;
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me man</Button>
    </div>
  );
}

export default App;
