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
