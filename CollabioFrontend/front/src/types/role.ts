// types/role.ts

export type RoleName = 'USER' | 'ADMIN' | 'MANAGER' | string; // Enum varsa ona göre daraltılabilir

export interface Role {
  _id?: string;
  name: RoleName;
  permissions: string[]; // İstersen enum olarak da detaylandırabiliriz
  createdAt?: string;
  updatedAt?: string;
}
