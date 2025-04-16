
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
interface Assignee {
  avatarUrl: string;
  email: string;
  fullName: string;
  id: number;
}

type Priority = "Low" | "Medium" | "High";
type Status = "Backlog" | "In Progress" | "Done";
