// types/comment.ts

export interface Comment {
    _id?: string;
    taskId: string;
    authorUserId: {
        username: string;
        _id: string;
    };
    content: string;
    createdAt?: string;   // veya Date
    updatedAt?: string;
  }
  