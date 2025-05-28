export interface Project {
  _id: string;
  name: string;
  description?: string;
  owner: string;
  members: string[];
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
}
