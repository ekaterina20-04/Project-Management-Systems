
export interface SummaryBoardId {
  assignee: Assignee;
  description: string;
  id: number;
  priority: Priority;
  status: Status;
  title: string;
}
export interface BoardIdResponse {
  data: SummaryBoardId[];
}
export interface Assignee {
  avatarUrl: string;
  email: string;
  fullName: string;
  id: number;
}

export type Priority = "Low" | "Medium" | "High";
export type Status = "Backlog" | "InProgress" | "Done";

