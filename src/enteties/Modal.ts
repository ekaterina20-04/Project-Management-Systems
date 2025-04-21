import { Priority, Status } from "./Board";

export interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId?: number;
  initialMode: "create" | "view";
  onSuccess?: () => void;
}
export type Mode = "create" | "view" | "edit";
export interface CreateFormState {
  title: string;
  description: string;
  boardId: string;
  assigneeId: string;
  assigneeName: string;
  priority: Priority | "";
  status: Status | "";
}
