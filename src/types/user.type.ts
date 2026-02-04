export const roleEnum = ["SUPER_ADMIN", "ADMIN", "STUDENT"] as const;
export type Trole = (typeof roleEnum)[number];

export interface IUser {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: Trole;
  address: string | null;
  isRouteAssigned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransportAsStudent {
  route: { id: string; name: string };
  vehicle: { id: string; vehicleNo: string };
  pickupPoint: { id: string; name: string };
}

export interface IMothAndYear {
  month:string,
  year:string
}
export interface IAllStudent {
  id: string;
  email: string;
  name: string;
  role: string;
  address: string | null;
  isRouteAssigned: boolean;
  createdAt: string;
  updatedAt: string;
  transportAsStudent: ITransportAsStudent[];
  student?:IMothAndYear[]
}


// my info 

export interface IStudentSelf {
  month: string
  year: string
  fee: IStudentFee
  transport: IStudentTransport
  isTransportAssigned: boolean
}

export interface IStudentFee {
  id: string
  amount: number
  month: string
  year: string
  status: string
  createdAt: string
  updatedAt: string
}
export interface IStudentTransport {
  id: string
  assignedAt: string
  updatedAt: string
  route: IStudentRoute
  vehicle: IStudentVehicle
  pickupPoint: IStudentPickupPoint
}

export interface IStudentRoute {
  id: string
  name: string
  startPoint: string
  endPoint: string
  monthlyFee: number
}

export interface IStudentVehicle {
  id: string
  vehicleNo: string
  driverName: string
  contactNo: string
}

export interface IStudentPickupPoint {
  id: string
  name: string
  address: string
}