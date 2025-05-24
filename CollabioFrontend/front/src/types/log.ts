// types/log.ts

export type ActionType =
  | 'CREATE_TASK'
  | 'UPDATE_TASK'
  | 'DELETE_TASK'
  | 'ADD_COMMENT'
  | 'UPLOAD_FILE'
  | 'CHANGE_STATUS'
  | 'APPROVE_TASK';

export interface Log {
  _id?: string;
  authorUserId: string;
  actionType: ActionType;
  taskId: string;
  timeStamp?: string;   // veya Date
  createdAt?: string;
  updatedAt?: string;
}
