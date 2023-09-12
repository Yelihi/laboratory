import { useReducer, useState, useCallback } from "react";
import "./styles.css";
// 추가될 todo 에 대한 component 제작하기
// 각 todo 에는 id 가 배정이 되고, 이 id 를 기반으로 delete 했을 때, 특정 항목만 삭제 되도록 한다.
// input 작성 후 submit 시 전체 todo 배열에 들어가야 한다.
// useReducer 를 활용해보도록 하자.

export function Todo({ id, inputText, onDelete }) {
  return (
    <li>
      <span>{inputText}</span>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

const defaultTodo = [];
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO: {
      return [...state, { id: action.id, value: action.value }];
    }
    case DELETE_TODO: {
      return state.filter((todo) => todo.id !== action.id);
    }
    default: {
      return state;
    }
  }
};

export default function App() {
  const [todos, dispatch] = useReducer(reducer, defaultTodo);
  const [value, setValue] = useState("");

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_TODO,
      id: Math.random() * 1000,
      value: value,
    });
    setValue("");
  }, [value]);

  const onDelete = useCallback(
    (id) => () => {
      dispatch({
        type: DELETE_TODO,
        id: id,
      });
    },
    []
  );

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type='text'
          aria-label='Add new task'
          placeholder='Add your task'
          value={value}
          onChange={onChange}
        />
        <div>
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
      <ul>
        {todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              inputText={todo.value}
              onDelete={onDelete(todo.id)}
            />
          );
        })}
      </ul>
    </div>
  );
}
