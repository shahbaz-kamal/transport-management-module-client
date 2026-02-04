export interface IRoute {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  createdAt: string;
  updatedAt: string;
  monthlyFee: number;
}

export interface IRouteFeeUpdate {
  routeId: string;
  monthlyFee: number;
}

export interface IPickupWithRoute {
  id: string;
  name: string;
  address: string;
  stopOrder: number;
  routePickupPointId: string;
}

export interface IRouteWithPickUp {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  createdAt: string;
  updatedAt: string;
  monthlyFee: number;
  pickupPoints: IPickupWithRoute[];
  vehicles: { id: string; vehicleNo: string; driverName: string; contactNo: string; createdAt: string; updatedAt: string }[];
}

export interface IAddRouteFormValues {
  name: string;
  startPoint: string;
  endPoint: string;
  monthlyFee: number;
  pickupPoints: { name: string; address: string; stopOrder: number }[];
}

export interface IFeeDataResult {
  id: string;
  userId: string;
  amount: number;
  month: string;
  year: string;
  status: string;
  assignedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITransportDataResult {
  id: string;
  userId: string;
  routeId: string;
  vehicleId: string;
  pickupPointId: string;
  assignedBy: string;
  assignedAt: string;
  updatedAt: string;
}

export interface IStudentAssignResult {
  feeData: IFeeDataResult;
  transportData: ITransportDataResult;
}

export interface IFeeAssign {
  userId: string
  amount: number
  month: string
  year: string
  status: string
}

export interface ITransportAssign {
  userId: string
  routeId: string
  vehicleId: string
  pickupPointId: string
}

export interface IStudentFeeAndTransportAssign {
  feeAssign:IFeeAssign,
  transportAssign :ITransportAssign
}