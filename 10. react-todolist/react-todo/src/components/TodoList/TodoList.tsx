import React, { useState, useEffect } from "react";
import style from "./TodoList.module.css";

import TodoItem from "../TodoItem/TodoItem";
import { TodoListItem } from "../TodoItem/TodoItem";
import useSearchTodo from "../../hooks/useSearchTodo";

type TodoListProps = {
  todoList: TodoListItem[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoListItem[]>>;
};

const TodoList = ({ todoList, setTodoList }: TodoListProps) => {
  const [searchValue, onChange, resultTodoList] = useSearchTodo(todoList);

  const deleteTodoItem = (id: number) => () => {
    const filterTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(filterTodoList);
  };

  const changeChecked = (id: number) => () => {
    const checkingTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCheck: !todo.isCheck };
      } else {
        return { ...todo };
      }
    });
    setTodoList(checkingTodoList);
  };

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
              deleteTodoItem={deleteTodoItem(todo.id)}
              changeChecked={changeChecked(todo.id)}
              {...todo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
