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
