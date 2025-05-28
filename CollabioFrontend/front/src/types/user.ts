// types/user.ts

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  profilePictureUrl?: string;
  role?: string; 
  teams?: string[];
  favorites?: string[];
  createdAt?: string;
  updatedAt?: string;
}
