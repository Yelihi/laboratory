import React, { useRef } from "react";
import style from "./TodoEditor.module.css";

import useInput from "../../hooks/useInput";
import { TodoListItem } from "../TodoItem/TodoItem";

type TodoEditorProps = {
  setTodoList: React.Dispatch<React.SetStateAction<TodoListItem[]>>;
};

const TodoEditor = ({ setTodoList }: TodoEditorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue, onInputChange] = useInput();

  const addTodoList = () => {
    if (value == "" && inputRef.current !== null) {
      inputRef.current.focus();
      return;
    }
    const newTodo: TodoListItem = {
      // ref 를 활용하여 ref.current++ 로 고유 id 를 생성할 수도 있다.
      id: Math.random() * 100,
      content: value,
      date: new Date().getTime(),
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
        ref={inputRef}
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
