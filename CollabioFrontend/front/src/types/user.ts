// types/user.ts

export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    profilePictureUrl?: string;
    role?: string;        // Role ObjectId
    teams?: string[];     // Team ObjectId listesi
    createdAt?: string;
    updatedAt?: string;
  }
  