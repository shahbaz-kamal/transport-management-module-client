export interface IVehicle {
  id: string;
  routeId: string;
  vehicleNo: string;
  driverName: string;
  contactNo: string;
  createdAt: string;
  updatedAt: string;
  route: { id: string; name: string; startPoint: string; endPoint: string; createdAt: string; updatedAt: string; monthlyFee: number };
}


export interface ICreateVehicle {
    routeId: string
    vehicleNo: string
    driverName: string
    contactNo: string
}

export interface IResponseCreateVehicle {
    id: string
    routeId: string
    vehicleNo: string
    driverName: string
    contactNo: string
    createdAt: string
    updatedAt: string
}