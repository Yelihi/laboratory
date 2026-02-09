// task entity
export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: number;
  title: string;
  priority: Priority;
  completed: boolean;
}

// action types
export type Action =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "TOGGLE_TASK"; payload: number }
  | { type: "UPDATE_PRIORITY"; payload: { id: number; priority: Priority } }
  | { type: "DELETE_TASK"; payload: number };

// const action types
export const type = {
  ADD_TASK: "ADD_TASK" as const,
  TOGGLE_TASK: "TOGGLE_TASK" as const,
  UPDATE_PRIORITY: "UPDATE_PRIORITY" as const,
  DELETE_TASK: "DELETE_TASK" as const,
};
