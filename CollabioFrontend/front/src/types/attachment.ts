export interface Attachment {
    _id: string;
    fileUrl: string;
    fileName: string;
    taskId: string;           // mongoose.Types.ObjectId string temsili
    uploadedBy: string;       // mongoose.Types.ObjectId string temsili
    uploadedDate?: string;    // ISO string veya Date objesi olabilir
    createdAt?: string;
    updatedAt?: string;
  }