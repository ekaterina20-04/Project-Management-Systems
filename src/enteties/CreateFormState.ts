import { Priority, Status } from "./Board";

export interface CreateFormState {
    title: string;
    description: string;
    boardId: string;      
    assigneeId: string;    
    priority: Priority | "";
    status: Status | "";
  }