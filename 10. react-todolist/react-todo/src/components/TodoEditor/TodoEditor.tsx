import React from "react";
import style from "./TodoEditor.module.css";

import useInput from "../../hooks/useInput";
import { TodoListItem } from "../TodoItem/TodoItem";

type TodoEditorProps = {
  setTodoList: React.Dispatch<React.SetStateAction<TodoListItem[]>>;
};

const TodoEditor = ({ setTodoList }: TodoEditorProps) => {
  const [value, setValue, onInputChange] = useInput();

  const getCreateTodoDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    return `${year}.${month}.${day}`;
  };

  const addTodoList = () => {
    const newTodo: TodoListItem = {
      id: Math.random() * 100,
      content: value,
      date: getCreateTodoDate(),
      isCheck: false,
    };
    setTodoList((prev) => [newTodo, ...prev]);
    setValue("");
  };

  const enterButton = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      addTodoList();
    }
  };

  return (
    <div className={style.TodoEditor}>
      <input
        placeholder='새로운 TODO...'
        value={value}
        onChange={onInputChange}
        onKeyDown={(e) => enterButton(e)}
      />
      <button onClick={addTodoList}>추가</button>
    </div>
  );
};

export default TodoEditor;
