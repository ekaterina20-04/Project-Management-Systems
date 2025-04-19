import { Assignee, Priority, Status } from "./Board";

export interface SummaryTask {
    assignee: Assignee;
    boardId: number;
    boardName: string;
    description: string;
    id: number;
    priority: Priority;
    status: Status;
    title: string;
  }
export interface TasksResponse{
    data: SummaryTask[]
}
export interface GetTaskResponse{
    assignee: Assignee;
    boardName: string;
    description: string;
    id: number;
    priority: Priority;
    status: Status;
    title: string;
  
}