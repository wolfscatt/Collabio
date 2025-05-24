// types/comment.ts

export interface Comment {
    _id?: string;
    taskId: string;
    authorUserId: string;
    content: string;
    createdAt?: string;   // veya Date
    updatedAt?: string;
  }
  