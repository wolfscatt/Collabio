import { User } from "./user";

export interface Project {
  _id: string;
  name: string;
  description: string;
  owner: string;
  members: [User];
  status: "active" | "complete" | "canceled";
  startDate?: string;
  endDate?: string;
  teamId?: string;
  createdAt: string;
  updatedAt: string;
}
