import { TodoListItem } from "../components/TodoItem/TodoItem";

export const reducer = (state: TodoListItem[], action: any) => {
  switch (action.type) {
    case "DELETE_TODO": {
      return state.filter((todo) => todo.id !== action.data);
    }
    case "CHANGE_CHECK": {
      return state.map((todo) =>
        todo.id == action.data ? { ...todo, isCheck: !todo.isCheck } : todo
      );
    }
    case "ADD_TODO": {
      const newTodo: TodoListItem = {
        id: Math.random() * 100,
        content: action.data,
        date: new Date().getTime(),
        isCheck: false,
      };
      return [newTodo, ...state];
    }
    default:
      return state;
  }
};

export const defaultValue: TodoListItem[] = [];
