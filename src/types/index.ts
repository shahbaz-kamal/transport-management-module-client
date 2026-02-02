import type { ComponentType, JSX } from "react";

export * from "./user.type.ts";
export * from "./route.types.ts"

export interface TMeta {
  page: number;
  limit: number;
  totalPage: number;
  totalDocuments: number;
}

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
}

export interface ISidebarItems {
  title: string;
  items: {
    title:string
    url: string;
    component: ComponentType;
    icon: JSX.Element;
  }[];
}
