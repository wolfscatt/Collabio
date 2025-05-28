export interface Project {
  _id: string;
  name: string;
  description?: string;
  owner: {
    _id: string;
    email?: string;
    username: string;
  };
  members: Array<{
    _id: string;
    email?: string;
    username: string;
  }>;
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
}
