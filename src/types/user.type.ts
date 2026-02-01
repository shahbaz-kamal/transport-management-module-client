export const roleEnum = ["SUPER_ADMIN", "ADMIN", "STUDENT"] as const;
export type Trole = (typeof roleEnum)[number];

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Trole;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
}
