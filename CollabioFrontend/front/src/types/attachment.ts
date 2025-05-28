// types/attachment.ts

export interface UserSummary {
  _id: string;
  username: string;
  email: string;
}

export interface Attachment {
  _id: string;
  fileUrl: string;
  fileName: string;
  taskId: string;
  uploadedBy: UserSummary | string;    // string olabiliyor, ya da UserSummary
  uploadedDate: string;
  createdAt: string;
  updatedAt: string;
}
