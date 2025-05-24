export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  startDate?: string;
  endDate?: string;
  isApproved: boolean;
  approvedAt?: string;
  projectId: {
    _id: string;
    name: string;
    description: string;
    owner: string;
    members: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  assignee?: {
    _id: string;
    username: string;
    email: string;
  };
  reporter?: {
    _id: string;
    username: string;
    email: string;
  };
  comments: {
    _id: string;
    taskId: string;
    authorUserId: {
      _id: string;
      username: string;
      email: string;
    };
    content: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
