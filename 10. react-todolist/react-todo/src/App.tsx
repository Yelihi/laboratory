import "./App.css";
import { useReducer, useCallback } from "react";
import Header from "./components/Header/Header";
import TodoEditor from "./components/TodoEditor/TodoEditor";
import TodoList from "./components/TodoList/TodoList";

import { reducer, defaultValue } from "./reducer/Todo";

function App() {
  const [todoLists, dispatch] = useReducer(reducer, defaultValue);

  const onCreate = (content: string) => {
    dispatch({
      type: "ADD_TODO",
      data: content,
    });
  };

  const onCheck = useCallback((id: number) => {
    dispatch({
      type: "CHANGE_CHECK",
      data: id,
    });
  }, []);

  const onDelete = useCallback((id: number) => {
    dispatch({
      type: "DELETE_TODO",
      data: id,
    });
  }, []);

  return (
    <section className='App'>
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todoList={todoLists} onCheck={onCheck} onDelete={onDelete} />
    </section>
  );
}

export default App;
