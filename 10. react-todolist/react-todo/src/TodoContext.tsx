import { createContext } from "react";
import { TodoListItem } from "./components/TodoItem/TodoItem";

type TodoStateContextProps = {
  todoLists: TodoListItem[];
};

type TodoDispatchContextProps = {
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
  onCreate: (content: string) => void;
};

export const TodoStateContext = createContext<TodoStateContextProps | null>(
  null
);
export const TodoDispatchContext =
  createContext<TodoDispatchContextProps | null>(null);
