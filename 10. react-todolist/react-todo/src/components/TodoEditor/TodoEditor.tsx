import React, { useRef } from "react";
import style from "./TodoEditor.module.css";

import useInput from "../../hooks/useInput";

type TodoEditorProps = {
  onCreate: (content: string) => void;
};

const TodoEditor = ({ onCreate }: TodoEditorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue, onInputChange] = useInput();

  const addTodoList = () => {
    if (value == "" && inputRef.current !== null) {
      inputRef.current.focus();
      return;
    }
    onCreate(value);
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
