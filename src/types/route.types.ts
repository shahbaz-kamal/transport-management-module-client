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

interface IPickupWithRoute {
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
