import { Priority, Status } from "./Board";

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
}
export interface SelectStatusProps {
  value: Status | "";
  onChange: (value: Status) => void;
}
export interface SelectPriorietyProps {
  value: Priority | "";
  onChange: (value: Priority) => void;
}
