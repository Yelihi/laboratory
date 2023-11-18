import React from "react";
import style from "./TodoList.module.css";

import TodoItem from "../TodoItem/TodoItem";
import { TodoListItem } from "../TodoItem/TodoItem";
import useSearchTodo from "../../hooks/useSearchTodo";

type TodoListProps = {
  todoList: TodoListItem[];
  deleteTodoItem: (id: number) => void;
  changeChecked: (id: number) => void;
};

const TodoList = ({
  todoList,
  deleteTodoItem,
  changeChecked,
}: TodoListProps) => {
  const [searchValue, onChange, resultTodoList] = useSearchTodo(todoList);

  return (
    <div className={style.TodoList}>
      <h4>Todos</h4>
      <input
        placeholder='검색어를 입력하세요'
        value={searchValue}
        onChange={onChange}
      />
      <div className={style.todosWrapper}>
        {resultTodoList.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              deleteTodoItem={deleteTodoItem}
              changeChecked={changeChecked}
              {...todo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
