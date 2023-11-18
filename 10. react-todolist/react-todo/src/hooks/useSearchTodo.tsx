import { useState } from "react";

import { TodoListItem } from "../components/TodoItem/TodoItem";

const useSearchTodo = (todoList: TodoListItem[]) => {
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filterTodoList = () => {
    if (searchValue == "") {
      return todoList;
    }

    return todoList.filter((todo) =>
      todo.content.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const resultTodoList = filterTodoList();

  return [searchValue, onChange, resultTodoList] as const;
};

export default useSearchTodo;
