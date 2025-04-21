import { Priority, Status } from "./Board";

export interface TaskCreatePequest {
  assigneeId: number;
  boardId: number;
  description: string;
  priority: Priority;
  title: string;
}
export interface TaskCreateResponse {
  id: number;
}

export interface TaskUpdatePequest {
  assigneeId: number;
  status: Status;
  description: string;
  priority: Priority;
  title: string;
}
export interface TaskUpdateResponse {
  message: string;
}
