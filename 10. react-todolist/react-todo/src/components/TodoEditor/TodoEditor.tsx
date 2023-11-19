import React, { useRef } from "react";
import style from "./TodoEditor.module.css";

import useInput from "../../hooks/useInput";

type TodoEditorProps = {
  dispatch: React.Dispatch<any>;
};

const TodoEditor = ({ dispatch }: TodoEditorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue, onInputChange] = useInput();

  const addTodoList = () => {
    if (value == "" && inputRef.current !== null) {
      inputRef.current.focus();
      return;
    }

    dispatch({
      type: "ADD_TODO",
      data: value,
    });
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
