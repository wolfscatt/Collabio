// types.ts
export type Priority = "Düşük" | "Orta" | "Yüksek";
export type Status = "pending" | "approved" | "rejected";

export interface Task {
  code: string;
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
  updatedAt?: Date;
  rejectReason?: string;
  status: Status;
  columnName?: string;
}





