export const roleEnum = ["SUPER_ADMIN", "ADMIN", "STUDENT"] as const;
export type Trole = (typeof roleEnum)[number];
