import { Priority } from "./Board";

export interface TaskCreatePequest{
    assigneeId: number,
  boardId: number,
  description: string,
  priority: Priority,
  title: string
}
export interface TaskCreateResponse{
    id:number
}